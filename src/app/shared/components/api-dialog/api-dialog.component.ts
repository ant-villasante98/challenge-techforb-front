import { Component, WritableSignal, inject } from '@angular/core';
import { ApiLoadService } from '../../services/api-load.service';

@Component({
  selector: 'app-api-dialog',
  standalone: true,
  imports: [],
  templateUrl: './api-dialog.component.html',
  styleUrl: './api-dialog.component.css'
})
export class ApiDialogComponent {

  private apiLoad = inject(ApiLoadService);

  show: WritableSignal<boolean> = this.apiLoad.stateShow;

}
