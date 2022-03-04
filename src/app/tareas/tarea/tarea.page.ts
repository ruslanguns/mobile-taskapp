import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Tarea } from 'src/app/shared/interfaces/tarea.interface';
import { TareaService } from 'src/app/services/tarea.service';
import { GetLocationComponent } from 'src/app/shared/components/get-location/get-location.component';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.page.html',
  styleUrls: ['./tarea.page.scss'],
})
export class TareaPage implements OnInit {
  @Input() task: Tarea | undefined = undefined;

  geoModal: HTMLIonModalElement;
  ngForm: FormGroup;
  addressSelected: Record<string, any> = null;

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
    this.addressSelected = this.task?.direccion;

    console.log(this.task);
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
          direccion: this.addressSelected,
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
    this.modalController.dismiss();
  }

  async presentGeoModal() {
    this.geoModal = await this.modalController.create({
      component: GetLocationComponent,
      swipeToClose: true,
      initialBreakpoint: 0.8,
      breakpoints: [0, 0.5, 0.8],
    });
    await this.geoModal.present();

    const {
      data: {
        data: { myLonLat = null },
      },
    } = await this.geoModal.onDidDismiss();
    this.addressSelected = myLonLat;
  }
}
