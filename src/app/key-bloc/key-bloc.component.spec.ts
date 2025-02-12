import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyBlocComponent } from './key-bloc.component';

describe('KeyBlocComponent', () => {
  let component: KeyBlocComponent;
  let fixture: ComponentFixture<KeyBlocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyBlocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyBlocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
