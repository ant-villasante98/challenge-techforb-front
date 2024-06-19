import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-plant-action',
  standalone: true,
  imports: [NgClass],
  templateUrl: './plant-action.component.html',
  styleUrl: './plant-action.component.css'
})
export class PlantActionComponent {
  @Output() updateEventEmitter = new EventEmitter<void>()
  @Output() deleteEventEmitter = new EventEmitter<void>()

  @Input({ required: true, alias: "plant-id" }) set setId(value: number) {
    this.id = value;
  }

  id!: number;

  showActions = signal<boolean>(false);


  toggleShowAction(event: any) {
    // if (!(event instanceof PointerEvent)) {
    //   return;
    // }
    // console.log(event)

    // if (event.currentTarget == event.target) {

    //   this.showActions.set(false);
    // }
    this.showActions.update(v => !v);
  }

  clickUpdate() {
    this.updateEventEmitter.emit();
    this.showActions.set(false);
  }

  clickRemove() {
    this.deleteEventEmitter.emit();
    this.showActions.set(false);
  }

}
