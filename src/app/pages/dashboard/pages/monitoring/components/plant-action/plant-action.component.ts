import { NgClass } from '@angular/common';
import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-plant-action',
  standalone: true,
  imports: [NgClass],
  templateUrl: './plant-action.component.html',
  styleUrl: './plant-action.component.css'
})
export class PlantActionComponent {
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
    this.showActions.set(false);
  }

  clickRemove() {
    this.showActions.set(false);
  }

}
