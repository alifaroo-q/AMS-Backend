import { InjectRepository } from '@nestjs/typeorm';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Repository } from 'typeorm';
import { Registration } from '../entities/registration.entity';

@ValidatorConstraint({ async: true })
export class IsUniEmailUnique implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Registration)
    private registrationRepository: Repository<Registration>,
  ) {}
  async validate(uni_email: string, args: ValidationArguments) {
    const regUser = await this.registrationRepository.findOneBy({ uni_email });
    if (regUser) return false;
    return true;
  }
}

export function UniEmailAvailable(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniEmailUnique,
    });
  };
}
