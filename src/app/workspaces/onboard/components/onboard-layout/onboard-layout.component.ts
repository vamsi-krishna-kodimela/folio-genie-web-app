import { Component } from '@angular/core';

@Component({
  selector: 'app-onboard-layout',
  templateUrl: './onboard-layout.component.html',
  styleUrls: ['./onboard-layout.component.scss'],
})
export class OnboardLayoutComponent {
  steps: {
    label: string;
    isCompleted: boolean;
    isActive: boolean;
    cta: string;
  }[] = [
    {
      label: "Let's Get Started",
      isCompleted: false,
      isActive: true,
      cta: 'Create Profile',
    },
    {
      label: 'Create Profile',
      isCompleted: false,
      isActive: false,
      cta: 'Proceed',
    },
    {
      label: 'Customize Portfolio',
      isCompleted: false,
      isActive: false,
      cta: 'Fetch Profile',
    },
    {
      label: 'Preview & Launch',
      isCompleted: false,
      isActive: false,
      cta: 'Save & Launch',
    },
  ];
}
