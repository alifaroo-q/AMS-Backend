import { Expose } from 'class-transformer';

export class AlumniDto {
  @Expose()
  id: number;
  @Expose()
  first_name: string;
  @Expose()
  middle_name: string;
  @Expose()
  last_name: string;
  @Expose()
  avatar: string;
  @Expose()
  designation: string;
}
