import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaEditComponent } from './pessoa-edit.component';

describe('PessoaEditComponent', () => {
  let component: PessoaEditComponent;
  let fixture: ComponentFixture<PessoaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PessoaEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PessoaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
