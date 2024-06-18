import { Component, signal } from '@angular/core';
import { ReadingCardComponent } from './components/reading-card/reading-card.component';
import { CustomBtnDirective } from '../../../../shared/directives/custom-btn.directive';

@Component({
  selector: 'app-monitoring',
  standalone: true,
  imports: [ReadingCardComponent, CustomBtnDirective],
  templateUrl: './monitoring.component.html',
  styleUrl: './monitoring.component.css'
})
export class MonitoringComponent {
  plantList = signal<any[]>([1, 2, 3, 4])

}
