import {
  BasicDetails,
  Project,
  SiteConfig,
  Skill,
  SocialMediaHandle,
} from '..';
import { UserStatus } from './user-status.enum';

export interface Profile {
  _id: string;
  basicDetails: BasicDetails;
  socialMediaHandles: SocialMediaHandle[];
  siteConfig: SiteConfig;
  skills: Skill[];
  education: any[];
  experiences: any[];
  projects: Project[];
  status: UserStatus;
}
