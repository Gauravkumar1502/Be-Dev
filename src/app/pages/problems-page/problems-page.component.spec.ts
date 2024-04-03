import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemsPageComponent } from './problems-page.component';

describe('ProblemsPageComponent', () => {
  let component: ProblemsPageComponent;
  let fixture: ComponentFixture<ProblemsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProblemsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProblemsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
