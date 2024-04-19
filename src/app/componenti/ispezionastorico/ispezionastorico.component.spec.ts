import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IspezionastoricoComponent } from './ispezionastorico.component';

describe('IspezionastoricoComponent', () => {
  let component: IspezionastoricoComponent;
  let fixture: ComponentFixture<IspezionastoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IspezionastoricoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IspezionastoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
