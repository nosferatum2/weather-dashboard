import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GeolocationInfoModel } from '../../../../shared/services/geocoding-api/geolocation-info.model';

@Component({
  selector: 'app-input-autocomplete',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input-autocomplete.component.html',
  styleUrl: './input-autocomplete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputAutocompleteComponent implements OnInit {
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  public inputForm = this.fb.group({
    inputValue: ['', [Validators.minLength(1), Validators.maxLength(120)]]
  });

  public dataOptionsInput = input.required<GeolocationInfoModel[]>();
  public inputChanged = output<string | null>();

  // Option select variables
  private option = signal<GeolocationInfoModel | null>(null)
  public optionSelected = output<GeolocationInfoModel>()

  protected readonly Boolean = Boolean;

  ngOnInit(): void {
    this.inputForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged((prev, curr) => {
          if (prev.inputValue && curr.inputValue) {
            return prev.inputValue.trim() === curr.inputValue.trim()
          }

          return false
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(val => {
        if (val.inputValue && val.inputValue.length > 0) {
          this.inputChanged.emit(val.inputValue);
        } else {
          this.inputChanged.emit(null);
        }
      });
  }

  public isValid(): boolean {
    return (
      this.inputForm.valid
      && !!this.option()
      && !!this.inputForm.controls.inputValue.getRawValue()?.length
    )
  }

  public onSubmit(event: Event): void {
    event.preventDefault()
    const option = this.option()

    if (option) {
      this.optionSelected.emit(option)
      this.option.set(null)
    }
  }

  public trackByCoord(option: GeolocationInfoModel): number {
    return option.lat + option.lon
  }

  public selectOption(option: GeolocationInfoModel): void {
    this.option.set(option);
    this.inputChanged.emit(null);

    this.inputForm.controls.inputValue.patchValue(
      [option.country, option.state, option.name].filter(Boolean).join(', '), // clear falsy values
      { emitEvent: false }
    );
  }
}
