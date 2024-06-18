import { Component, OnInit, inject, signal } from '@angular/core';
import { ReadingCardComponent } from './components/reading-card/reading-card.component';
import { CustomBtnDirective } from '../../../../shared/directives/custom-btn.directive';
import { CreatePlantModalComponent } from './components/create-plant-modal/create-plant-modal.component';
import { PlantService } from '../../../../shared/services/plant.service';
import { Plant } from '../../../../models/plant';
import { PlantActionComponent } from './components/plant-action/plant-action.component';

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

  ngOnInit(): void {
    this.getPlants();
  }

  getPlants() {
    this.plantService.get().subscribe({
      next: (res) => {
        this.plantList.set(res);
      }
    })
  }
}
