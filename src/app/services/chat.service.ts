import { Injectable } from '@angular/core';
import { collectionData } from 'rxfire/firestore';
import { Mensaje } from '../clases/mensaje.interface';
import { getFirestore, collection, addDoc, orderBy, query} from 'firebase/firestore';
import { initializeApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  db : Firestore;

  constructor() {
   this.db = getFirestore();
   initializeApp(environment.firebase);
  }

  getMsg() {
    const mensajesRef = collection(this.db, 'Mensajes');
    const queryMsg = query(mensajesRef, orderBy('fecha', 'asc'));
    return collectionData(queryMsg, { idField: 'id' });
  }

  addMsg(mensaje: Mensaje) {
     addDoc(collection(this.db, 'Mensajes'), mensaje);
  }
}
