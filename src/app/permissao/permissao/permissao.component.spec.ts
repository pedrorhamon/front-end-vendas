import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissaoComponent } from './permissao.component';

describe('PermissaoComponent', () => {
  let component: PermissaoComponent;
  let fixture: ComponentFixture<PermissaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PermissaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermissaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
