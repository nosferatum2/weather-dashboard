import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsListComponent } from './options-list.component';
import { GeolocationInfoModel } from '../../../../../../shared/services/geocoding-api/geolocation-info.model';
import { mockGeolocationDataList } from '../../../../../../shared/mock/mock-geolocation-data-list';

describe('OptionsListComponent', () => {
  const MOCK_OPTIONS: GeolocationInfoModel[] = mockGeolocationDataList;
  let component: OptionsListComponent;
  let fixture: ComponentFixture<OptionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionsListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OptionsListComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('dataOptionsInput', MOCK_OPTIONS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display options list', () => {
    const optionsList = fixture.nativeElement.querySelector('ul');

    expect(optionsList).toBeTruthy();
    expect(optionsList.children.length).toBe(MOCK_OPTIONS.length);
  });

  it('should display option details', () => {
    const optionsList = fixture.nativeElement.querySelector('ul');
    const firstOption = optionsList.children[0];

    expect(firstOption.querySelector('h5').textContent).toBe(MOCK_OPTIONS[0].name);
    expect(firstOption.querySelector('span').textContent).toContain(MOCK_OPTIONS[0].country);
    expect(firstOption.querySelector('span').textContent).toContain(MOCK_OPTIONS[0].name);
  });

  it('should emit optionSelected event on option click', () => {
    const optionsList = fixture.nativeElement.querySelector('ul');
    const firstOption = optionsList.children[0];
    const optionSelectedSpy = spyOn(component.optionSelected, 'emit');

    firstOption.click();
    expect(optionSelectedSpy).toHaveBeenCalledTimes(1);
    expect(optionSelectedSpy).toHaveBeenCalledWith(MOCK_OPTIONS[0]);
  });

});
