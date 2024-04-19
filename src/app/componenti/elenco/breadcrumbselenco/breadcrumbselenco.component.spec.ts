import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbselencoComponent } from './breadcrumbselenco.component';

describe('BreadcrumbselencoComponent', () => {
  let component: BreadcrumbselencoComponent;
  let fixture: ComponentFixture<BreadcrumbselencoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreadcrumbselencoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BreadcrumbselencoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
