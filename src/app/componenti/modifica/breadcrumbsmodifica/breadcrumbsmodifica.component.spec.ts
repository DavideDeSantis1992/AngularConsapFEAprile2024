import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbsmodificaComponent } from './breadcrumbsmodifica.component';

describe('BreadcrumbsmodificaComponent', () => {
  let component: BreadcrumbsmodificaComponent;
  let fixture: ComponentFixture<BreadcrumbsmodificaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreadcrumbsmodificaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BreadcrumbsmodificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
