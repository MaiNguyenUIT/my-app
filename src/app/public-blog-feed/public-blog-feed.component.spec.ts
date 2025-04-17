import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicBlogFeedComponent } from './public-blog-feed.component';

describe('PublicBlogFeedComponent', () => {
  let component: PublicBlogFeedComponent;
  let fixture: ComponentFixture<PublicBlogFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicBlogFeedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicBlogFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
