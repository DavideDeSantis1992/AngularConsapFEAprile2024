import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderaccessoComponent } from './headeraccesso.component';

describe('HeaderaccessoComponent', () => {
  let component: HeaderaccessoComponent;
  let fixture: ComponentFixture<HeaderaccessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderaccessoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderaccessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
