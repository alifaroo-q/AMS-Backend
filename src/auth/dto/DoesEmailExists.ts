import { InjectRepository } from '@nestjs/typeorm';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';

@ValidatorConstraint({ async: true })
export class DoesEmailExist implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async validate(email: string, args: ValidationArguments) {
    const user = await this.userRepository.findOneBy({ email });
    if (user) return true;
    return false;
  }
}

export function EmailExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: DoesEmailExist,
    });
  };
}
