import { AfterViewInit, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import grapesjs from 'grapesjs';
import { SharedModule } from '../shared/shared.module';
import { EditorService } from '../shared/services/editor/editor.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-template-editor',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './template-editor.component.html',
  styleUrls: ['./template-editor.component.scss'],
})
export class TemplateEditorComponent implements AfterViewInit {
  content: string = '';
  editorChangeListener!: Subscription;

  private editor: any;
  devices: {
    name: string;
    icon: string;
    device: DEVICE;
  }[] = [
    {
      name: 'Desktop',
      icon: 'monitor',
      device: DEVICE.Desktop,
    },
    {
      name: 'Tablet',
      icon: 'tablet',
      device: DEVICE.Tablet,
    },
    {
      name: 'Mobile',
      icon: 'smartphone',
      device: DEVICE.Mobile,
    },
  ];
  selectedDevice: DEVICE = DEVICE.Desktop;
  constructor(private editorService: EditorService) {}
  ngOnInit() {
    this.editor = grapesjs.init({
      container: '#gjs',
      fromElement: true,
      height: '100%',
      width: 'auto',
      storageManager: false,
      panels: { defaults: [] },
      plugins: [],
    });
    this.editor.setDevice(this.selectedDevice);
    this.editor.DomComponents.getWrapper().set({
      ...DISABLE_COMPONENTS,
    });
    this.editorChangeListener = this.editorService.editorChange.subscribe({
      next: (val) => {
        this.content = val;
        this.setComponent(val);
      },
    });
  }
  switchDevice(device: DEVICE) {
    this.selectedDevice = device;
    this.editor.setDevice(device);
  }

  setComponent(val: String) {
    if (this.editor) {
      this.editor.DomComponents.clear();
      this.editor.addComponents({
        content: val,
        ...DISABLE_COMPONENTS,
      });
    }
  }
  ngAfterViewInit(): void {
    this.setComponent(this.content);
  }
}

enum DEVICE {
  Desktop = 'Desktop',
  Tablet = 'Tablet',
  Mobile = 'mobilePortrait',
}

const DISABLE_COMPONENTS = {
  badgable: false,
  selectable: false,
  draggable: false,
  copyable: false,
  removable: false,
  showToolbar: false,
  draggableComponents: false,
  droppable: false,
  stylable: false,
  highlightable: false,
  resizable: false,
  editable: false,
  hoverable: false,
  locked: false,
};
