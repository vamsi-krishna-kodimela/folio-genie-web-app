import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../services';
import { Subscription } from 'rxjs';
import { User } from '../../types';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  user?: User;
  subscriptions: Subscription[] = [];
  showActions: boolean = false;

  @HostListener('document:click', ['$event'])
  listenClicks(event: Event) {
    if (this.showActions) {
      this.showActions = false;
      event.stopPropagation();
      event.preventDefault();
    }
  }
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.user.value$.subscribe((user) => {
      this.user = user;
    });
  }

  get profilePicture(): string {
    return (
      this.user?.profile?.basicDetails?.profilePic ??
      '/assets/images/common/user-placeholder.png'
    );
  }
  get name(): string {
    return this.user?.profile?.basicDetails?.firstName ?? 'User';
  }
  toggleActions(event: Event): void {
    this.showActions = !this.showActions;
    event.stopPropagation();
    event.preventDefault();
  }
}
