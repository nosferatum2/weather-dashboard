import { ChangeDetectionStrategy, Component, computed, inject, input, InputSignal } from '@angular/core';
import { MAIN_LOADER, SpinnerService } from '../../services/spinner/spinner.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { Observable } from 'rxjs';

export type SpinnerColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

@Component({
    selector: 'app-spinner',
    imports: [
        AsyncPipe,
        NgClass
    ],
    templateUrl: './spinner.component.html',
    styleUrl: './spinner.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent {
  private spinnerService = inject(SpinnerService);

  color: InputSignal<SpinnerColor> = input<SpinnerColor>('primary');
  componentName = input<string>(MAIN_LOADER);

  public textColor = computed(() => 'text-' + this.color());

  public isInProgress(): Observable<boolean> {
    return this.spinnerService.isLoading(this.componentName());
  }

}
