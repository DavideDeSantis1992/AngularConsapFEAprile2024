import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IspezionaComponent } from './ispeziona.component';

describe('IspezionaComponent', () => {
  let component: IspezionaComponent;
  let fixture: ComponentFixture<IspezionaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IspezionaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IspezionaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
