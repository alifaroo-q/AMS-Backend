import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';
import { UserService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { TokenDto } from './dto/token.dto';
import { VerifyNewAccountDto } from './dto/verify-new-account.dto';
import { VerifyUniEmailDto } from './dto/verify-uni-email.dto';
import { Registration } from './entities/registration.entity';

@Injectable()
export class RegistrationsService {
  private logger = new Logger(RegistrationsService.name);

  constructor(
    @InjectRepository(Registration)
    private registrationRepository: Repository<Registration>,
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  genToken(size: number) {
    const rand = () => Math.random().toString(36).substring(2);
    const token = (length: number) =>
      (rand() + rand() + rand() + rand()).substring(0, length);
    return token(size);
  }

  create(createRegistrationDto: CreateRegistrationDto) {
    const regUser = this.registrationRepository.create(createRegistrationDto);
    return this.registrationRepository.save(regUser);
  }

  async verifyUniEmail({ uni_reg_id }: VerifyUniEmailDto) {
    const uni_email = uni_reg_id.toLowerCase() + '@dsu.edu.pk';
    const token = this.genToken(40);

    try {
      await this.mailService.sendVerificationEmail(
        uni_email,
        token,
        'internal',
      );
      await this.registrationRepository.increment(
        { uni_email },
        'uni_email_sent',
        1,
      );

      await this.registrationRepository.update(
        { uni_email },
        { step: 1, uni_token: token },
      );

      const reg_user = await this.registrationRepository.findOneBy({
        uni_email,
      });

      return { token: reg_user.uni_token, id: reg_user.id, email: uni_email };
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getUniEmailTokenData({ token }: TokenDto) {
    const reg_user = await this.registrationRepository.findOne({
      where: { uni_token: token, uni_verified: true },
    });

    if (!reg_user)
      throw new BadRequestException('Invalid Token or Not Verified');

    const {
      uni_email_sent,
      uni_token,
      uni_verified,
      email_sent,
      email_token,
      email_verified,
      createdAt,
      updatedAt,
      ...remainingProperties
    } = reg_user;

    return remainingProperties;
  }

  async validateUniEmail(token: string) {
    const userWithValidToken = await this.registrationRepository.findOneBy({
      uni_token: token,
    });

    if (!userWithValidToken) throw new BadRequestException('Invalid Token');

    await this.registrationRepository.update(
      { id: userWithValidToken.id },
      { uni_verified: true, step: 2 },
    );

    return 'Your University Email Account has been Verified please Proceed with the Registration';
  }

  async verifyNewAccountEmail(verifyNewAccountDto: VerifyNewAccountDto) {
    const currentRegistrationUser = await this.registrationRepository.findOneBy(
      {
        id: verifyNewAccountDto.reg_id,
      },
    );

    if (!currentRegistrationUser)
      throw new BadRequestException('Registration not found');

    const { id, first_name, middle_name, last_name, uni_email } =
      currentRegistrationUser;

    const { phone, email, password } = verifyNewAccountDto;

    const token = this.genToken(40);

    try {
      await this.mailService.sendVerificationEmail(email, token, 'external');
      await this.registrationRepository.increment({ id }, 'email_sent', 1);

      await this.registrationRepository.update(
        { id },
        { step: 3, email_token: token },
      );

      const { id: uid } = await this.userService.create({
        uni_email,
        phone,
        first_name,
        middle_name,
        last_name,
        email,
        password,
      });

      return { user_id: uid, token, email };
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getNewAccountTokenData({ token }: TokenDto) {
    const reg_user = await this.registrationRepository.findOne({
      where: { email_token: token, email_verified: true },
    });

    if (!reg_user)
      throw new BadRequestException('Invalid Token or Not Verified');

    const {
      password,
      role,
      active_status,
      registration_status,
      createdAt,
      updatedAt,
      ...remainingProperties
    } = await this.userService.findByUniEmail(reg_user.uni_email);

    return remainingProperties;
  }

  async validateNewAccountEmail(token: string) {
    const res = await this.registrationRepository.findOneBy({
      email_token: token,
    });

    if (!res) throw new BadRequestException('Invalid Token');

    await this.registrationRepository.update(
      { id: res.id },
      { email_verified: true, step: 4 },
    );

    return 'Your Public Email Account has been Verified please Proceed with the Registration';
  }

  findAll() {
    return this.registrationRepository.find();
  }

  async getStepWithId(reg_num: string) {
    const uni_email = reg_num.toLowerCase() + '@dsu.edu.pk';
    const reg_user = await this.registrationRepository.findOneBy({ uni_email });

    if (!reg_user) throw new BadRequestException('Invalid roll number');

    return { step: reg_user.step, id: reg_user.id };
  }
}
