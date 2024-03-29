import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VideoInterviewRoomComponent } from './video-interview-room.component';

describe('VideoInterviewRoomComponent', () => {
  let component: VideoInterviewRoomComponent;
  let fixture: ComponentFixture<VideoInterviewRoomComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoInterviewRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoInterviewRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
