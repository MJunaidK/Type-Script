import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JunaidContainerComponentComponent } from './junaid-container-component/junaid-container-component.component';
import { JunaidPresentationComponentComponent } from './junaid-presentation-component/junaid-presentation-component.component';
@NgModule({
  imports: [CommonModule],
  declarations: [
    JunaidContainerComponentComponent,
    JunaidPresentationComponentComponent,
  ],
  exports: [
    JunaidContainerComponentComponent,
    JunaidPresentationComponentComponent,
  ],
})
export class JunaidLibModule {}
