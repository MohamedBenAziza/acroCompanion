import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataBoxComponent } from './data-box.component';

describe('DataBoxComponent', () => {
  let component: DataBoxComponent;
  let fixture: ComponentFixture<DataBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
