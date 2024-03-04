import { Component, OnInit } from '@angular/core';
import { ParserService } from 'src/app/shared/services/parser/parser.service';
import { OnboardService } from '../../services/onboard/onboard.service';

@Component({
  selector: 'app-parse-profile',
  templateUrl: './parse-profile.component.html',
  styleUrls: ['./parse-profile.component.scss'],
})
export class ParseProfileComponent implements OnInit {
  constructor(
    private parserService: ParserService,
    private onboardService: OnboardService
  ) {}

  ngOnInit() {
    this.getParserStatus();
  }

  getParserStatus() {
    this.parserService.getParserStatus().subscribe({
      next: (status) => {
        if (!status.isJobDone) {
          setTimeout(() => {
            this.getParserStatus();
          }, 100);
        } else {
          this.onboardService.mapUserStatus();
        }
      },
    });
  }
}
