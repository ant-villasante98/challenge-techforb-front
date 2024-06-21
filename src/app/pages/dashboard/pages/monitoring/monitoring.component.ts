import { Component, EventEmitter, OnInit, Output, inject, signal } from '@angular/core';
import { ReadingCardComponent } from './components/reading-card/reading-card.component';
import { CustomBtnDirective } from '../../../../shared/directives/custom-btn.directive';
import { CreatePlantModalComponent } from './components/create-plant-modal/create-plant-modal.component';
import { PlantService } from '../../../../shared/services/plant.service';
import { Plant } from '../../../../models/plant';
import { PlantActionComponent } from './components/plant-action/plant-action.component';
import { GlobalReading } from '../../../../models/global-reading';
import { UpdatePlantModalComponent } from './components/update-plant-modal/update-plant-modal.component';
import { ApiLoadService } from '../../../../shared/services/api-load.service';
import { IndicatorCardComponent } from './components/indicator-card/indicator-card.component';

@Component({
  selector: 'app-monitoring',
  standalone: true,
  imports: [ReadingCardComponent, CustomBtnDirective, CreatePlantModalComponent, PlantActionComponent, UpdatePlantModalComponent, IndicatorCardComponent],
  templateUrl: './monitoring.component.html',
  styleUrl: './monitoring.component.css'
})
export class MonitoringComponent implements OnInit {
  private apiLoad = inject(ApiLoadService);

  private plantService = inject(PlantService);

  selectedPlant: Plant | null = null;

  showCreatePlant = signal<boolean>(false);
  showUpdatePlant = signal<boolean>(false);
  loadingPlant = signal<boolean>(false);
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
    this.loadingPlant.set(true)
    this.plantService.get().subscribe({
      next: (res) => {
        this.plantList.set(res);
      },
      error: () => {
        this.loadingPlant.set(false)
      },
      complete: () => {
        this.loadingPlant.set(false)
      }
    })
  }

  deletePlant(id: number) {
    this.apiLoad.start();
    this.plantService.deleteOne(id).subscribe({
      next: () => {
        this.ngOnInit()
      },
      error: () => {
        this.apiLoad.end();
      },
      complete: () => {
        this.apiLoad.end();
      }
    });
  }

  actionUpdatePlant(value: Plant) {
    this.selectedPlant = value;
    this.showUpdatePlant.set(true);
  }

  updatePlant(value: Plant) {
    console.log()
    this.apiLoad.start();
    this.plantService.update(value.id, {
      numberOfDisabledSensors: value.numberOfDisabledSensors,
      numberOfMediumAlerts: value.numberOfMediumAlerts,
      numberOfReadings: value.numberOfReadings,
      numberOfRedAlerts: value.numberOfRedAlerts,
    }).subscribe({
      next: () => {
        this.showUpdatePlant.set(false);
        this.ngOnInit();
      },
      error: () => {
        this.apiLoad.end();
      },
      complete: () => {
        this.apiLoad.end();
      }
    });

  }

}
