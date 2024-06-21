import { Component, EventEmitter, Input, OnInit, Output, WritableSignal, inject, signal } from '@angular/core';
import { WrapModalComponent } from '../../../../../../shared/components/wrap-modal/wrap-modal.component';
import { Plant } from '../../../../../../models/plant';
import { CustomBtnDirective } from '../../../../../../shared/directives/custom-btn.directive';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-plant-modal',
  standalone: true,
  imports: [WrapModalComponent, CustomBtnDirective, ReactiveFormsModule],
  templateUrl: './update-plant-modal.component.html',
  styleUrl: './update-plant-modal.component.css'
})
export class UpdatePlantModalComponent implements OnInit {

  @Input({ required: true }) showModal!: WritableSignal<boolean>;

  @Input({ required: true, alias: 'plant' }) set setPlant(value: Plant | null) {
    this.plant = value;
    if (this.plant) {

      this.plantForm.setValue({
        numberOfReadings: this.plant.numberOfReadings,
        numberOfDisabledSensors: this.plant?.numberOfDisabledSensors,
        numberOfMediumAlerts: this.plant?.numberOfMediumAlerts,
        numberOfRedAlerts: this.plant?.numberOfRedAlerts,
      })
    }
  }
  @Output() updateEvent = new EventEmitter<Plant>()
  plant: Plant | null = null;

  private formBuilder = inject(FormBuilder);

  isDisable = signal<boolean>(false);
  plantForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.plantForm = this.formBuilder.group({
      numberOfReadings: [(this.plant?.numberOfReadings ?? 0), Validators.required],
      numberOfDisabledSensors: [(this.plant?.numberOfDisabledSensors ?? 0), Validators.required],
      numberOfMediumAlerts: [(this.plant?.numberOfMediumAlerts ?? 0), Validators.required],
      numberOfRedAlerts: [(this.plant?.numberOfRedAlerts ?? 0), Validators.required],
    })

  }
  get numberOfReadings() {
    return this.plantForm.controls["numberOfReadings"];
  }
  get numberOfDisabledSensors() {
    return this.plantForm.controls["numberOfDisabledSensors"];
  }
  get numberOfMediumAlerts() {
    return this.plantForm.controls["numberOfMediumAlerts"];
  }
  get numberOfRedAlerts() {
    return this.plantForm.controls["numberOfRedAlerts"];
  }

  close() {
    this.showModal.set(false);
  }

  submitUpdate() {
    if (this.plant) {
      console.log(this.plant.id)
      this.updateEvent.emit({
        ...this.plant,
        numberOfReadings: this.numberOfReadings.value,
        numberOfDisabledSensors: this.numberOfDisabledSensors.value,
        numberOfMediumAlerts: this.numberOfMediumAlerts.value,
        numberOfRedAlerts: this.numberOfRedAlerts.value
      });
    }
  }

}
