import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyBoxComponent } from './key-box.component';

describe('KeyBoxComponent', () => {
  let component: KeyBoxComponent;
  let fixture: ComponentFixture<KeyBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
