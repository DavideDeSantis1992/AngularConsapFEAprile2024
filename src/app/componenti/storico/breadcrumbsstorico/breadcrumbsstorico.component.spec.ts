import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbsstoricoComponent } from './breadcrumbsstorico.component';

describe('BreadcrumbsstoricoComponent', () => {
  let component: BreadcrumbsstoricoComponent;
  let fixture: ComponentFixture<BreadcrumbsstoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreadcrumbsstoricoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BreadcrumbsstoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
