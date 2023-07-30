import { Profile } from '..';

export interface User {
  _id: string;
  email: string;
  token?: string;
  isProfileCompleted: boolean;
  profile: Profile;
}
