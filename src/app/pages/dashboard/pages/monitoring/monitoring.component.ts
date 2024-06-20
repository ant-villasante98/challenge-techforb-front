import { Component, EventEmitter, OnInit, Output, inject, signal } from '@angular/core';
import { ReadingCardComponent } from './components/reading-card/reading-card.component';
import { CustomBtnDirective } from '../../../../shared/directives/custom-btn.directive';
import { CreatePlantModalComponent } from './components/create-plant-modal/create-plant-modal.component';
import { PlantService } from '../../../../shared/services/plant.service';
import { Plant } from '../../../../models/plant';
import { PlantActionComponent } from './components/plant-action/plant-action.component';
import { GlobalReading } from '../../../../models/global-reading';
import { UpdatePlantModalComponent } from './components/update-plant-modal/update-plant-modal.component';

@Component({
  selector: 'app-monitoring',
  standalone: true,
  imports: [ReadingCardComponent, CustomBtnDirective, CreatePlantModalComponent, PlantActionComponent, UpdatePlantModalComponent],
  templateUrl: './monitoring.component.html',
  styleUrl: './monitoring.component.css'
})
export class MonitoringComponent implements OnInit {

  private plantService = inject(PlantService);

  selectedPlant: Plant | null = null;

  showCreatePlant = signal<boolean>(false);
  showUpdatePlant = signal<boolean>(false);
  plantList = signal<Plant[]>([]);
  globalReading = signal<GlobalReading>({
    disableSensors: 0,
    mediumAlerts: 0,
    readingOK: 0,
    redAlerts: 0
  });

  ngOnInit(): void {
    this.getPlants();
    this.getGlobalRading();
  }


  getGlobalRading() {
    this.plantService.getGlobalReading().subscribe({
      next: (data) => {
        this.globalReading.set(data);
      }
    });
  }

  getPlants() {
    this.plantService.get().subscribe({
      next: (res) => {
        this.plantList.set(res);
      }
    })
  }

  deletePlant(id: number) {
    this.plantService.deleteOne(id).subscribe({
      next: () => {
        this.ngOnInit()
      }
    });
  }

  actionUpdatePlant(value: Plant) {
    this.selectedPlant = value;
    this.showUpdatePlant.set(true);
  }

  updatePlant(value: Plant) {
    console.log()

    this.plantService.update(value.id, {
      numberOfDisabledSensors: value.numberOfDisabledSensors,
      numberOfMediumAlerts: value.numberOfMediumAlerts,
      numberOfReadings: value.numberOfReadings,
      numberOfRedAlerts: value.numberOfRedAlerts,
    }).subscribe({
      next: () => {
        this.showUpdatePlant.set(false);
        this.ngOnInit();
      }
    });

  }

}
