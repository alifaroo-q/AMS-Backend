import { InjectRepository } from '@nestjs/typeorm';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';

@ValidatorConstraint({ async: true })
export class IsEmailAvailable implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async validate(email: string, args: ValidationArguments) {
    const user = await this.userRepository.findOneBy({ email });
    if (user) return false;
    return true;
  }
}

export function EmailAvailable(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAvailable,
    });
  };
}
