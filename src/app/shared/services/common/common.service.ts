import { Injectable } from '@angular/core';
import { ReactiveValue } from '../../utils/reactive-value.class';
import { GlobalLoaderComponent } from '../../components/global-loader/global-loader.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private _globalLoader$: ReactiveValue<number>;
  private _globalLoader: MatDialogRef<GlobalLoaderComponent> | undefined;
  constructor(private _dialog: MatDialog) {
    this._globalLoader$ = new ReactiveValue<number>(0);
  }
  setContentLoader(show: boolean) {
    if (show) {
      if (this._globalLoader$.value == 0) {
        this._globalLoader = this._dialog.open(GlobalLoaderComponent, {
          disableClose: true,
          closeOnNavigation: false,
          hasBackdrop: true,
          panelClass: 'global-loader-panel',
        });
      }
      this._globalLoader$.value! += 1;
    } else {
      if (this._globalLoader$.value! > 0) {
        this._globalLoader$.value! -= 1;
      }
      if (this._globalLoader$.value! == 0 && this._globalLoader) {
        this._globalLoader.close();
      }
    }
  }
}
