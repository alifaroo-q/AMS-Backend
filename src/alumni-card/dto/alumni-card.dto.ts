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
  @Transform(({ obj }) => obj.user.id)
  userId: User;
}
