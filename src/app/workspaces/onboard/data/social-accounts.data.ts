import { SocialMediaHandle } from 'src/app/shared/types';

const SOCIAL_ACCOUNTS: SocialMediaHandle[] = [
  {
    isChecked: true,
    icon: 'linkedin',
    handle: 'linkedin',
    link: '',
    canDelete: false,
  },
  {
    isChecked: false,
    icon: 'github',
    handle: 'github',
    link: '',
    canDelete: true,
  },
  {
    isChecked: false,
    icon: 'dribbble',
    handle: 'dribbble',
    link: '',
    canDelete: true,
  },
];

export { SOCIAL_ACCOUNTS };
