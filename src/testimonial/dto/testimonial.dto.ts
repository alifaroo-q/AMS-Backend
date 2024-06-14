import { Expose, Transform } from 'class-transformer';
import { User } from '../../users/entities/users.entity';

export class TestimonialDto {
  @Expose()
  id: string;
  @Expose()
  avatar: string;
  @Expose()
  class_year: number;
  @Expose()
  company: string;
  @Expose()
  department: string;
  @Expose()
  designation: string;
  @Expose()
  first_name: string;
  @Expose()
  last_name: string;
  @Expose()
  middle_name: string;
  @Expose()
  testimony: string;
  @Expose()
  @Transform(({ obj }) => obj.user.id)
  userId: User;
}
