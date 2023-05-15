import { Component } from '@angular/core';

@Component({
  selector: 'app-connect-social-accounts',
  templateUrl: './connect-social-accounts.component.html',
  styleUrls: ['./connect-social-accounts.component.scss'],
})
export class ConnectSocialAccountsComponent {
  socialAccounts: SocialAccount[] = [
    {
      isChecked: true,
      iconName: 'linkedin',
      value: '',
    },
    {
      isChecked: false,
      iconName: 'github',
      value: '',
    },
    {
      isChecked: false,
      iconName: 'dribbble',
      value: '',
    },
  ];
}
interface SocialAccount {
  isChecked: boolean;
  iconName: string;
  value: string;
}
