import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiLoadService {

  readonly stateShow = signal<boolean>(false);

  constructor() { }

  start() {
    this.stateShow.set(true);
  }

  end() {
    this.stateShow.set(false);
  }
}
