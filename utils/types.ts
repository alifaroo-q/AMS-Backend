export type CreateUserParams = {
  email: string;
  password: string;
  first_name: string;
  middle_name: string;
  last_name: string;
};

export type UpdateUserParams = {
  email: string;
  password: string;
  first_name: string;
  middle_name: string;
  last_name: string;
};

export type CreateProfileParam = {
  dob: Date;
  timezone: string;
  country: string;
};
