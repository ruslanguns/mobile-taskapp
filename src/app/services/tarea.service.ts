import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Tarea } from '../shared/interfaces/tarea.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TareaService {
  constructor(private firestore: AngularFirestore) {}

  private get collection() {
    return this.firestore.collection<Tarea>('tareas');
  }

  getAll() {
    return this.collection.snapshotChanges().pipe(
      map((docs) =>
        docs.map(({ payload: { doc } }) => ({
          ...doc.data(),
          id: doc.id,
        }))
      )
    );
  }

  getOne(id: string) {
    return this.collection.doc(id).valueChanges();
  }

  async createOne(tarea: Tarea) {
    return await this.collection
      .add({ ...tarea, completed: false })
      .catch((error) => console.error(error));
  }

  async updateOne(id: string, tarea: Partial<Tarea>) {
    return await this.collection.doc(id).update(tarea);
  }

  async deleteOne(id: string) {
    return await this.collection.doc(id).delete();
  }
}
