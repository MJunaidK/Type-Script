import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JunaidPresentationComponentComponent } from './junaid-presentation-component.component';

describe('JunaidPresentationComponentComponent', () => {
  let component: JunaidPresentationComponentComponent;
  let fixture: ComponentFixture<JunaidPresentationComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JunaidPresentationComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JunaidPresentationComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
