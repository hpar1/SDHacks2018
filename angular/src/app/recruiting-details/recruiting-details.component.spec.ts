import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitingDetailsComponent } from './recruiting-details.component';

describe('RecruitingDetailsComponent', () => {
  let component: RecruitingDetailsComponent;
  let fixture: ComponentFixture<RecruitingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruitingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
