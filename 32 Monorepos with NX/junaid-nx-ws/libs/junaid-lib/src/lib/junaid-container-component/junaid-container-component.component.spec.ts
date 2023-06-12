import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JunaidContainerComponentComponent } from './junaid-container-component.component';

describe('JunaidContainerComponentComponent', () => {
  let component: JunaidContainerComponentComponent;
  let fixture: ComponentFixture<JunaidContainerComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JunaidContainerComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JunaidContainerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
