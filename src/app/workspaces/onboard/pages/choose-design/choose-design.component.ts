import { Component } from '@angular/core';
import { Template } from 'src/app/shared/types/common/template.interface';
import { OnboardService } from '../../services/onboard/onboard.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-choose-design',
  templateUrl: './choose-design.component.html',
  styleUrls: ['./choose-design.component.scss'],
})
export class ChooseDesignComponent {
  selectedTemplate?: string;
  subscriptions: Subscription[] = [];
  templates: Template[] = [];

  constructor(
    private onboardService: OnboardService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.templates = this.onboardService.getTemplates();
    this.subscriptions.push(this.listenProceed());
  }

  selectTemplate(template: Template): void {
    this.selectedTemplate = template.id;
  }

  previewTemplate(event: Event, template: Template): void {
    window.open(template.demoLink, '_blank');
    event.stopPropagation();
  }

  listenProceed(): Subscription {
    return this.onboardService.proceed$.subscribe(() => {
      this.saveTemplate();
    });
  }

  saveTemplate() {
    if (this.selectedTemplate != null) {
      this.onboardService.updateSelectedTemplate(this.selectedTemplate);
    } else {
      this.toastr.error('Please select a template');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  
}
