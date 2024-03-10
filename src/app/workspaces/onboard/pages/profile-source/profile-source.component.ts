import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { OnboardService } from '../../services/onboard/onboard.service';
import { ParserService } from 'src/app/shared/services/parser/parser.service';

@Component({
  selector: 'app-profile-source',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './profile-source.component.html',
  styleUrl: './profile-source.component.scss',
})
export class ProfileSourceComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  profileSources: { icon: string; displayValue: string; sourceCode: string }[] =
    [
      { icon: 'linkedin', displayValue: 'Linkedin', sourceCode: 'LINKEDIN' },
      // { icon: 'github', displayValue: 'Github', sourceCode: 'GITHUB' },
      { icon: 'file-text', displayValue: 'Resume', sourceCode: 'RESUME' },
    ];
  selectedProfileSource?: string;

  constructor(
    private onboardService: OnboardService,
    private parserService: ParserService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(this.listenProceed());
  }

  selectSource(sourceCode: string): void {
    this.selectedProfileSource = sourceCode;
  }
  listenProceed() {
    return this.onboardService.proceed$.subscribe({
      next: () => {
        if (!this.selectedProfileSource) {
          return;
        }
        this.parserService.openResumeParser();
      },
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}
