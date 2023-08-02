import { UserStatus } from 'src/app/shared/types/user/user-status.enum';

interface OnboardStep {
  label: string;
  group: UserStatus[];
  cta: string;
}

export { OnboardStep };
