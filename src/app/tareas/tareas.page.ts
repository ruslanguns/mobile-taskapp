import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { Tarea } from '../shared/interfaces/tarea.interface';
import { TareaService } from '../services/tarea.service';
import { TareaPage } from './tarea/tarea.page';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage {
  tasks$ = this.tareaService
    .getAll()
    .pipe(map((tasks) => tasks.filter((x) => !x.completed)));
  taskModal: HTMLIonModalElement;

  constructor(
    private tareaService: TareaService,
    public modalController: ModalController
  ) {}

  deleteTask(id: string) {
    this.tareaService.deleteOne(id);
  }

  markAsCompleted(id: string) {
    this.tareaService.updateOne(id, { completed: true });
  }

  async presentModal(task?: Tarea) {
    this.taskModal = await this.modalController.create({
      component: TareaPage,
      swipeToClose: true,
      initialBreakpoint: 0.8,
      breakpoints: [0, 0.5, 1],
      componentProps: { task },
    });
    return await this.taskModal.present();
  }

  closeModal() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
