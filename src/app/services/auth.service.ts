import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Timestamp } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private authenticFirebase : Auth, private firestore : AngularFirestore, private autenticacionAngular :AngularFireAuth ){}
  correoUsuario: string = ''; // Variable para almacenar el correo del usuario

  // Método para iniciar sesión
  iniciarSesion(correo: string, pass: string) {
    return signInWithEmailAndPassword(this.authenticFirebase, correo, pass)
      .then(() => {
        this.correoUsuario = correo; // Almacena el correo del usuario después de iniciar sesión
        this.guardarInfoLogin(correo); // Guardar información de inicio de sesión en Firestore
      });
  }

  registro(correo : string, pass : string){
    return createUserWithEmailAndPassword(this.authenticFirebase, correo, pass);
  }

  async guardarInfoLogin(email: string) {
    const loginInfo = {
      email: email,
      timestamp: new Date()
    };

    try {
      await this.firestore.collection('usuarios').add(loginInfo);
      console.log("La información de inicio de sesión se guardó correctamente en Firestore.");
    } catch (error) {
      console.error("Error al guardar la información de inicio de sesión en Firestore:", error);
    }
  }

  obtenerUsuarioConectado(){
    return this.autenticacionAngular.authState;
  }

  cerrarSesion() {
    return signOut(this.authenticFirebase);
  }

  obtenerDatosUsuario(){
    return this.autenticacionAngular.currentUser;
  }

  obtenerMensajes(): Observable<any[]> {
    return this.firestore.collection('mensajes', ref => ref.orderBy('fechaHorario')).valueChanges()
      .pipe(
        map((mensajes: any[]) => {
          return mensajes.map(mensaje => {
            const fechaHorario = (mensaje.fechaHorario as Timestamp).toDate();
            return { ...mensaje, fechaHorario };
          });
        })
      );
  }

  getCurrentUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authenticFirebase.onAuthStateChanged(
        (user) => {
          resolve(user);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  
}
