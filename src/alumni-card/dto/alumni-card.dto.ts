import { Expose, Transform } from 'class-transformer';
import { User } from '../../users/entities/users.entity';

export class AlumniCardDto {
  @Expose()
  id: string;
  @Expose()
  isApproved: boolean;
  @Expose()
  isRequested: boolean;
  @Expose()
  @Transform(({ obj }) => ({
    id: obj.user.id,
    first_name: obj.user.first_name,
    last_name: obj.user.last_name,
    roll_no: obj.user?.uni_email.split('@')[0],
    uni_email: obj.user.uni_email,
  }))
  user: User;
}
