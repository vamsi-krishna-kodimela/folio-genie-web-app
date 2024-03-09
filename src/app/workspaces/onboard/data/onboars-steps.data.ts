import { UserStatus } from 'src/app/shared/types/user/user-status.enum';
import { OnboardStep } from '../types/onboard-step.interface';

const ONBOARD_STEPS: OnboardStep[] = [
  {
    label: "Let's Get Started",
    group: [UserStatus.NEW],
    cta: 'Create Profile',
  },
  {
    label: 'Create Profile',
    group: [UserStatus.GET_STARTED, UserStatus.CHOOSE_PROFESSION],
    cta: 'Proceed',
  },
  {
    label: 'Customize Portfolio',
    group: [
      // UserStatus.CONNECT_SOCIAL,
      UserStatus.CONFIGURE_WEBSITE,
      UserStatus.PARSING_SOURCE,
      UserStatus.PARSING,
      UserStatus.PARSING_DONE,
    ],
    cta: 'Fetch Profile',
  },
  {
    label: 'Preview & Launch',
    group: [UserStatus.CHOOSE_DESIGN, UserStatus.DRAFT],
    cta: 'Save & Launch',
  },
];

export { ONBOARD_STEPS };
