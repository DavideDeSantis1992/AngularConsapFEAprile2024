import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbsispezionaComponent } from './breadcrumbsispeziona.component';

describe('BreadcrumbsispezionaComponent', () => {
  let component: BreadcrumbsispezionaComponent;
  let fixture: ComponentFixture<BreadcrumbsispezionaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreadcrumbsispezionaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BreadcrumbsispezionaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
