import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBarrComponent } from './progress-barr.component';

describe('ProgressBarrComponent', () => {
  let component: ProgressBarrComponent;
  let fixture: ComponentFixture<ProgressBarrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressBarrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressBarrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
