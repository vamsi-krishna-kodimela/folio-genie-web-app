import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import grapesjs from 'grapesjs';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-template-editor',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './template-editor.component.html',
  styleUrls: ['./template-editor.component.scss'],
})
export class TemplateEditorComponent {
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
    this.editor.addComponents({
      content: this.content + this.content + this.content,
      ...DISABLE_COMPONENTS,
    });
  }
  switchDevice(device: DEVICE) {
    this.selectedDevice = device;
    this.editor.setDevice(device);
  }

  content: string = `  Sample HTML Code
  <h1>
    <span style="font-size: 1.5rem; color: #000000"
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
      voluptatibus, quibusdam, quia, voluptatum voluptatem quod exercitationem
      quos doloribus quas voluptates natus. Quisquam voluptatibus, quibusdam,
      quia, voluptatum voluptatem quod exercitationem quos doloribus quas
      voluptates natus.</span
    >
  </h1>

  <p>
    <span style="font-size: 1.5rem; color: #000000"
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
      voluptatibus, quibusdam, quia, voluptatum voluptatem quod exercitationem
      quos doloribus quas voluptates natus. Quisquam voluptatibus, quibusdam,
      quia, voluptatum voluptatem quod exercitationem quos doloribus quas
      voluptates natus.</span
    >
  </p>

  <p>
    <span style="font-size: 1.5rem; color: #000000"
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
      voluptatibus, quibusdam, quia, voluptatum voluptatem quod exercitationem
      quos doloribus quas voluptates natus. Quisquam voluptatibus, quibusdam,
      quia, voluptatum voluptatem quod exercitationem quos doloribus quas
      voluptates natus.</span
    >
  </p>

  <p>
    <span style="font-size: 1.5rem; color: #000000"
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
      voluptatibus, quibusdam, quia, voluptatum voluptatem quod exercitationem
      quos doloribus quas voluptates natus. Quisquam voluptatibus, quibusdam,
      quia, voluptatum voluptatem quod exercitationem quos doloribus quas
      voluptates natus.</span
    >
  </p>`;
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
