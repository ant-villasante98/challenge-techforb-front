import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-indicator-card',
  standalone: true,
  imports: [],
  templateUrl: './indicator-card.component.html',
  styleUrl: './indicator-card.component.css'
})
export class IndicatorCardComponent {
  @Input({ required: true }) title: string = "";
  @Input({ required: true }) ok: number = 0;
  @Input({ required: true }) warning: number = 0;
  @Input({ required: true }) alert: number = 0;
  @Input({ required: true }) icon: string = "";

}
