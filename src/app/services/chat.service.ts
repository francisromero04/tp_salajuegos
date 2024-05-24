import { Injectable } from '@angular/core';
import { getFirestore, collection, addDoc, orderBy, query} from 'firebase/firestore';
import { Firestore, Timestamp } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from '../clases/usuario';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  db : Firestore;

  //Trabaja con la base de datos
  constructor(private firestore: AngularFirestore){
   this.db = getFirestore();
  }

  getMsg(): Observable<any[]> {
    return this.firestore.collection('mensajes', ref => ref.orderBy('fechaHorario')).valueChanges().pipe(
      map((mensajes: any[]) => {
        return mensajes.map(mensaje => {
          const fechaHorario = (mensaje.fechaHorario as Timestamp).toDate();
          return { ...mensaje, fechaHorario };
        });
      })
    );
  }

  //Guarda mensajes con el uid usuario
  async addMsg(usuario: Usuario) {
    const mensaje = usuario;
    await this.firestore.collection('mensajes').add(mensaje);

  }
}
