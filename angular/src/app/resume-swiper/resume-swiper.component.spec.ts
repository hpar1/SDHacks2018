import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeSwiperComponent } from './resume-swiper.component';

describe('ResumeSwiperComponent', () => {
  let component: ResumeSwiperComponent;
  let fixture: ComponentFixture<ResumeSwiperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeSwiperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
