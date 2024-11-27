import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubPermissaoEditComponent } from './sub-permissao-edit.component';

describe('SubPermissaoEditComponent', () => {
  let component: SubPermissaoEditComponent;
  let fixture: ComponentFixture<SubPermissaoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubPermissaoEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubPermissaoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
