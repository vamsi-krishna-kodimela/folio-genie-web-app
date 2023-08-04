import { Component } from '@angular/core';
import { OnboardService } from '../../services/onboard/onboard.service';

@Component({
  selector: 'app-parse-profile',
  templateUrl: './parse-profile.component.html',
  styleUrls: ['./parse-profile.component.scss'],
})
export class ParseProfileComponent {
  constructor(private onboardService: OnboardService) {}
}
