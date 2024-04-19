import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbsispezionastoricoComponent } from './breadcrumbsispezionastorico.component';

describe('BreadcrumbsispezionastoricoComponent', () => {
  let component: BreadcrumbsispezionastoricoComponent;
  let fixture: ComponentFixture<BreadcrumbsispezionastoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreadcrumbsispezionastoricoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BreadcrumbsispezionastoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
