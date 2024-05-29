import { TableroDeJuego } from "./tablero";

export class Comida {
  private readonly tablero: TableroDeJuego; // Instancia de la clase TableroDeJuego
  private readonly TASA_DE_EXPANSION: number = 1;
  private puntaje: number = 0;
  private comida: any;
  private serpiente: any;

  constructor(serpiente: any) {
    this.serpiente = serpiente;
    this.tablero = new TableroDeJuego(); // Instanciación del tablero
    this.comida = this.obtenerPosicionAleatoriaDeComida();
  }

  actualizar() {
    if (this.serpiente.enSerpiente(this.comida)) {
      this.serpiente.expandirSerpiente(this.TASA_DE_EXPANSION);
      this.comida = this.obtenerPosicionAleatoriaDeComida();
      this.incrementarPuntaje = 1;
    }
  }

  dibujar(tableroDeJuego: any) {
    const elementoDeComida = document.createElement('div');
    elementoDeComida.style.gridRowStart = this.comida.y;
    elementoDeComida.style.gridColumnStart = this.comida.x;
    elementoDeComida.classList.add('comida');
    elementoDeComida.style.borderRadius = '50%';
    elementoDeComida.style.backgroundColor = '#007580';
    elementoDeComida.style.transition = 'all .3ms ease-in';
    elementoDeComida.style.border = '0.25vmin solid black';
    tableroDeJuego.appendChild(elementoDeComida);
  }

  private obtenerPosicionAleatoriaDeComida() {
    let nuevaPosicionDeComida: any;
    while (nuevaPosicionDeComida == null || this.serpiente.enSerpiente(nuevaPosicionDeComida)) {
      nuevaPosicionDeComida = this.tablero.posicionAleatoriaEnRejilla(); // Llamada al método del tablero
    }
    return nuevaPosicionDeComida;
  }

  set incrementarPuntaje(valor: number) {
    this.puntaje += valor;
  }

  get puntajeActual() {
    return this.puntaje;
  }
}
