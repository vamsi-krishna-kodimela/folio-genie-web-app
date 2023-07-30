import {
  BasicDetails,
  Project,
  SiteConfig,
  Skill,
  SocialMediaHandle,
} from '..';

export interface Profile {
  _id: string;
  basicDetails: BasicDetails;
  socialMediaHandles: SocialMediaHandle[];
  siteConfig: SiteConfig;
  skills: Skill[];
  education: any[];
  experiences: any[];
  projects: Project[];
}
