import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayormenorComponent } from './mayormenor.component';

describe('MayormenorComponent', () => {
  let component: MayormenorComponent;
  let fixture: ComponentFixture<MayormenorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MayormenorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MayormenorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
