import { Component, OnInit, inject, signal } from '@angular/core';
import { ReadingCardComponent } from './components/reading-card/reading-card.component';
import { CustomBtnDirective } from '../../../../shared/directives/custom-btn.directive';
import { CreatePlantModalComponent } from './components/create-plant-modal/create-plant-modal.component';
import { PlantService } from '../../../../shared/services/plant.service';
import { Plant } from '../../../../models/plant';
import { PlantActionComponent } from './components/plant-action/plant-action.component';
import { GlobalReading } from '../../../../models/global-reading';

@Component({
  selector: 'app-monitoring',
  standalone: true,
  imports: [ReadingCardComponent, CustomBtnDirective, CreatePlantModalComponent, PlantActionComponent],
  templateUrl: './monitoring.component.html',
  styleUrl: './monitoring.component.css'
})
export class MonitoringComponent implements OnInit {
  private plantService = inject(PlantService);

  showCreatePlant = signal<boolean>(false)
  plantList = signal<Plant[]>([])
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
        console.log(data)
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
}
