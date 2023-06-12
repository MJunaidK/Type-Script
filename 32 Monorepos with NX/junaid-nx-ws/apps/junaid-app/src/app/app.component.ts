import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { JunaidLibModule } from '@junaid-nx-ws/junaid-lib';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, JunaidLibModule],
  selector: 'junaid-nx-ws-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'junaid-app';
}
