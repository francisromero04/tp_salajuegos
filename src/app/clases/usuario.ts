import { Timestamp } from "@angular/fire/firestore";

export interface Usuario {
  uid?: string;
  email?: string;
  mensaje?: string;
  fechaHorario?: Timestamp; 
  //? hace que los datos sean opcionales
}