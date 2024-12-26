import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { InputAutocompleteComponent } from './input-autocomplete.component';
import { FormBuilder, Validators } from '@angular/forms';
import { GeolocationInfoModel } from '../../../../shared/services/geocoding-api/geolocation-info.model';

describe('InputAutocompleteComponent', () => {
  let component: InputAutocompleteComponent;
  let fixture: ComponentFixture<InputAutocompleteComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputAutocompleteComponent],
      providers: [FormBuilder]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InputAutocompleteComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    component.inputForm = formBuilder.group({
      inputValue: ['', [Validators.minLength(1), Validators.maxLength(120)]]
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize inputForm with empty inputValue', () => {
    expect(component.inputForm.value.inputValue).toBe('');
  });

  it('should set menuOpened to true when inputForm value changes', fakeAsync(() => {
    const inputValue = 'test';
    component.inputForm.setValue({ inputValue });

    tick(500);
    expect(component.menuOpened()).toBe(true);
  }));

  it('should emit inputChanged event when inputForm value changes', fakeAsync(() => {
    const inputValue = 'test';
    const inputChangedSpy = spyOn(component.inputChanged, 'emit');
    component.inputForm.setValue({ inputValue });

    tick(500);
    expect(inputChangedSpy).toHaveBeenCalledTimes(1);
    expect(inputChangedSpy).toHaveBeenCalledWith(inputValue);
  }));

  it('should call onSubmit when form is submitted', () => {
    const onSubmitSpy = spyOn(component, 'onSubmit');
    const event = new Event('submit');
    component.onSubmit(event);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });

  it('should set inputForm value to selected option name', () => {
    const option = { name: 'test' } as GeolocationInfoModel;
    component.onOptionSelect(option);
    expect(component.inputForm.value.inputValue).toBe(option.name);
  });

});
