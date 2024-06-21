import { Component, EventEmitter, Input, OnInit, Output, WritableSignal, inject, signal } from '@angular/core';
import { WrapModalComponent } from '../../../../../../shared/components/wrap-modal/wrap-modal.component';
import { CustomBtnDirective } from '../../../../../../shared/directives/custom-btn.directive';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { CountryService } from '../../../../../../shared/services/country.service';
import { Country } from '../../../../../../models/country';
import { PlantService } from '../../../../../../shared/services/plant.service';
import { CreatePlant } from '../../../../../../models/create-plant';
import { ApiLoadService } from '../../../../../../shared/services/api-load.service';

@Component({
  selector: 'app-create-plant-modal',
  standalone: true,
  imports: [WrapModalComponent, CustomBtnDirective, ReactiveFormsModule, NgClass],
  templateUrl: './create-plant-modal.component.html',
  styleUrl: './create-plant-modal.component.css'
})
export class CreatePlantModalComponent implements OnInit {
  @Input({ alias: "show-create-plant", required: true }) showModal!: WritableSignal<boolean>;
  @Output() newPlantEmitter: EventEmitter<any> = new EventEmitter<any>()

  private formBuilder = inject(FormBuilder);
  private countryService = inject(CountryService);
  private plantService = inject(PlantService);
  private apiLoad = inject(ApiLoadService);

  countryList = signal<Country[]>([])

  plantForm: FormGroup = new FormGroup({});

  isDisable = signal<boolean>(false);

  ngOnInit(): void {
    this.plantForm = this.formBuilder.group({
      name: ["", Validators.compose([Validators.required])],
      countryIndex: [-1, Validators.compose([Validators.required, Validators.min(0)])]
    });
    this.countryService.getAll().subscribe({
      next: (res) => {
        this.countryList.set(res.data)
      }
    })
  }

  get name() {
    return this.plantForm.controls["name"];
  }

  get countryIndex() {
    return this.plantForm.controls["countryIndex"];
  }

  submitCreate() {
    this.plantForm.markAllAsTouched();

    if (this.plantForm.invalid) {
      return;
    }

    let country: Country = this.countryList()[this.countryIndex.value];
    let newPlant: CreatePlant = {
      name: this.name.value,
      countryName: country.name,
      countryFlag: country.flagImage
    }
    this.isDisable.set(true);
    this.apiLoad.start();
    this.plantService.create(newPlant).subscribe({
      next: () => {
        this.newPlantEmitter.emit();
        this.close()
      },
      error: () => {
        this.isDisable.set(false);
        this.apiLoad.end();
      },
      complete: () => {
        this.isDisable.set(false);
        this.apiLoad.end();
      }
    })

  }

  close() {
    this.plantForm.reset();
    this.name.setValue("");
    this.countryIndex.setValue(-1)
    this.showModal.set(false);
  }

}
