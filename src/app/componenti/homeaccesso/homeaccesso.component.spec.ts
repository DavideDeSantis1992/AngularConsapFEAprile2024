import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeaccessoComponent } from './homeaccesso.component';

describe('HomeaccessoComponent', () => {
  let component: HomeaccessoComponent;
  let fixture: ComponentFixture<HomeaccessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeaccessoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeaccessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
