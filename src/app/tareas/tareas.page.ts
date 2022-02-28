import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Tarea } from '../interfaces/tarea.interface';
import { TareaService } from '../services/tarea.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {
  ngForm: FormGroup;
  selectedTask: Tarea | undefined = undefined;
  tasks$ = this.tareaService
    .getAll()
    .pipe(map((tasks) => tasks.filter((x) => !x.completed)));

  constructor(private fb: FormBuilder, private tareaService: TareaService) {
    this.ngForm = this.fb.group({
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(500),
        ],
      ],
    });
  }

  get description() {
    return this.ngForm.get('description');
  }

  get descriptionLength() {
    return this.description?.value?.length;
  }

  ngOnInit() {}

  onSubmit() {
    if (this.ngForm.valid) {
      const { description } = this.ngForm.value;

      if (this.selectedTask) {
        this.tareaService.updateOne(this.selectedTask.id, {
          description,
        });
        this.selectedTask = undefined;
      } else {
        this.tareaService.createOne({
          description,
          createdAt: new Date().toISOString(),
        });
      }

      this.ngForm.reset();
    }
  }

  onDelete(id: string) {
    console.log(id);
    this.tareaService.deleteOne(id);
  }

  onCompletedTask(id: string) {
    this.tareaService.updateOne(id, { completed: true });
  }

  setSelectedTask(task: Tarea) {
    this.selectedTask = task;
    this.ngForm.setValue({ description: task.description });
  }

  unSelectTask() {
    this.selectedTask = undefined;
    this.ngForm.reset();
  }

  archivar() {
    console.log('tarea archivada');
  }

  completada() {
    console.log('tarea completada');
  }

  nuevoEvento(event) {
    console.log(event);
  }
}
