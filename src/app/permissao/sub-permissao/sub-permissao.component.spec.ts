import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubPermissaoComponent } from './sub-permissao.component';

describe('SubPermissaoComponent', () => {
  let component: SubPermissaoComponent;
  let fixture: ComponentFixture<SubPermissaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubPermissaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubPermissaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
