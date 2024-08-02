import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LacamentoComponent } from './lacamento.component';

describe('LacamentoComponent', () => {
  let component: LacamentoComponent;
  let fixture: ComponentFixture<LacamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LacamentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LacamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
