import { Component, OnInit } from '@angular/core';
import { OnboardService } from '../../services/onboard/onboard.service';
import { Observable, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss'],
})
export class GetStartedComponent implements OnInit {
  userEmail$: Observable<string>;
  data: GetStartedData = {
    firstName: '',
    lastName: '',
    profilePic: '/assets/images/common/user-placeholder.png',
  };
  subscriptions: Subscription[] = [];
  constructor(
    private onboardService: OnboardService,
    private toastr: ToastrService
  ) {
    this.userEmail$ = onboardService.userEmail$;
  }
  ngOnInit(): void {
    this.subscriptions.push(this.fetchGetStartedData());
    this.subscriptions.push(this.listenProceed());
  }

  onProceed() {
    const isFormValid = this.validateData();
    if (isFormValid) {
      this.onboardService.updateBasicDetails(this.data);
    }
  }
  validateData(): boolean {
    for (const value of Object.values(this.data)) {
      if (value?.length == 0) {
        this.toastr.error('Please fill all the fields');
        return false;
      }
    }
    return true;
  }

  fetchGetStartedData() {
    return this.onboardService.getStartedData().subscribe((data) => {
      this.data = data;
    });
  }

  listenProceed() {
    return this.onboardService.proceed$.subscribe({
      next: () => this.onProceed(),
    });
  }
}

interface GetStartedData {
  firstName: string;
  lastName: string;
  profilePic?: string;
}
