import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SinglePostViewComponent } from './single-post-view.component';

describe('SinglePostViewComponent', () => {
  let component: SinglePostViewComponent;
  let fixture: ComponentFixture<SinglePostViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinglePostViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SinglePostViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
