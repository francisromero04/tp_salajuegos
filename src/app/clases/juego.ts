export class Juego {
  nombre: string;
  fecha: string;
  puntaje: number;
  juego: string;

  constructor(nombre: string, fecha: string, puntaje: number, juego: string) {
    this.nombre = nombre;
    this.fecha = fecha;
    this.puntaje = puntaje;
    this.juego = juego;
  }
}
