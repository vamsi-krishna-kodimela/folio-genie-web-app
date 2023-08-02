import { Profile } from '..';
import { UserStatus } from './user-status.enum';

export interface User {
  _id: string;
  email: string;
  token?: string;
  isProfileCompleted: boolean;
  profile: Profile;
  status: UserStatus;
}
