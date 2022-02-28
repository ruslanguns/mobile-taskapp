import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Tarea } from 'src/app/interfaces/tarea.interface';
import { TareaService } from 'src/app/services/tarea.service';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.page.html',
  styleUrls: ['./tarea.page.scss'],
})
export class TareaPage implements OnInit {
  @Input() task: Tarea | undefined = undefined;

  ngForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tareaService: TareaService,
    private modalController: ModalController
  ) {
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

  ngOnInit(): void {
    this.ngForm.setValue({
      description: this.task?.description || '',
    });
  }

  onSubmit() {
    if (this.ngForm.valid) {
      const { description } = this.ngForm.value;

      if (this.task) {
        this.tareaService.updateOne(this.task.id, {
          description,
        });
        this.task = undefined;
      } else {
        this.tareaService.createOne({
          description,
          createdAt: new Date().toISOString(),
        });
      }

      this.ngForm.reset();
    }
  }

  unSelectTask() {
    this.task = undefined;
    this.ngForm.reset();
    this.closeModal();
  }

  closeModal() {
    console.log('Cerrando');
    this.modalController.dismiss();
  }
}
