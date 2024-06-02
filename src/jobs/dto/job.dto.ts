import { User } from '../../users/entities/users.entity';
import { Expose, Transform } from 'class-transformer';

export class JobDto {
  @Expose()
  id: number;
  @Expose()
  title: string;
  @Expose()
  description: string;
  @Expose()
  end_date: Date;
  @Expose()
  organization_name: string;
  @Expose()
  organization_email: string;
  @Expose()
  location: string;
  @Expose()
  salary: string;
  @Expose()
  salary_type: string;
  @Expose()
  type: string;
  @Expose()
  experience: string;
  @Expose()
  job_time: string;
  @Expose()
  schedule_metrics: string;
  @Expose()
  isApproved: boolean;
  @Expose()
  isCreatedByAdmin: boolean;
  @Expose()
  @Transform(({ obj }) => obj.user.id)
  userId: User;
  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
}
