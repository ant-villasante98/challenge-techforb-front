import { Component, Input, WritableSignal, signal } from '@angular/core';

@Component({
  selector: 'app-reading-card',
  standalone: true,
  imports: [],
  templateUrl: './reading-card.component.html',
  styleUrl: './reading-card.component.css'
})
export class ReadingCardComponent {

  @Input({ required: true, alias: "name" }) set setName(value: string) {
    this.name.set(value);
  }
  @Input({ required: true, alias: "number" }) set setNumber(value: number) {
    this.number.set(value);
  }
  @Input({ required: true, alias: "icon" }) set setIcon(value: string) {
    this.icon.set(value);
  }
  name = signal<string>("");
  number = signal<number>(0);
  icon = signal<string>("");

}
