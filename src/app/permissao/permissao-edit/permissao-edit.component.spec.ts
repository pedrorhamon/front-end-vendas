import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissaoEditComponent } from './permissao-edit.component';

describe('PermissaoEditComponent', () => {
  let component: PermissaoEditComponent;
  let fixture: ComponentFixture<PermissaoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PermissaoEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermissaoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
