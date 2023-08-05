import { Component, OnDestroy, OnInit } from '@angular/core';
import { Profession } from 'src/app/shared/types';
import { OnboardService } from '../../services/onboard/onboard.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-choose-profession',
  templateUrl: './choose-profession.component.html',
  styleUrls: ['./choose-profession.component.scss'],
})
export class ChooseProfessionComponent implements OnInit, OnDestroy {
  selectedProfession: string = '';
  professions: Profession[] = [];
  subscriptions: Subscription[] = [];
  constructor(
    private onboardService: OnboardService,
    private toastr: ToastrService
  ) {}
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
  ngOnInit(): void {
    this.professions = this.onboardService.professions;
    this.subscriptions.push(this.fetchProfession());
    this.subscriptions.push(this.listenProceed());
  }
  getProfessionImage(profession: Profession): string {
    return `url(/assets/images/professions/${profession.image})`;
  }
  selectProfession(profession: Profession): void {
    this.selectedProfession = profession.id;
  }

  fetchProfession() {
    return this.onboardService.userProfession$.subscribe((data) => {
      this.selectedProfession = data;
    });
  }
  updateProfession() {
    const isValid = this.validateData();
    if (!isValid) return;
    const payload = { profession: this.selectedProfession };
    this.onboardService.updateBasicDetails(payload);
  }
  validateData(): boolean {
    if (this.selectedProfession.length == 0) {
      this.toastr.error('Please select a profession');
      return false;
    }
    return true;
  }

  listenProceed() {
    return this.onboardService.proceed$.subscribe({
      next: () => this.updateProfession(),
    });
  }
}
