import { Entrada } from './entrada';
export const VELOCIDAD_SERPIENTE = 7;

export class Serpiente {
  cuerpoSerpiente = [
    { x: 11, y: 11 }
  ];

  nuevosSegmentos = 0;
  entrada = new Entrada();

  escucharEntradas() {
    this.entrada.obtenerEntradas();
  }

  actualizar() {
    this.agregarSegmentos();
    const direccionEntrada = this.entrada.obtenerDireccionEntrada();
    for (let i = this.cuerpoSerpiente.length - 2; i >= 0; i--) {
      this.cuerpoSerpiente[i + 1] = { ...this.cuerpoSerpiente[i] };
    }
    this.cuerpoSerpiente[0].x += direccionEntrada.x;
    this.cuerpoSerpiente[0].y += direccionEntrada.y;
  }

  dibujar(tableroDeJuego: any) {
    this.cuerpoSerpiente.forEach(segmento => {
      const elementoSerpiente = document.createElement('div');
      elementoSerpiente.style.gridRowStart = segmento.y.toString();
      elementoSerpiente.style.gridColumnStart = segmento.x.toString();
      elementoSerpiente.style.backgroundColor = '#fed049';
      elementoSerpiente.style.border = '0.25vmin solid black';
      elementoSerpiente.style.transition = 'all .3ms ease-in';
      elementoSerpiente.classList.add('serpiente');
      tableroDeJuego.appendChild(elementoSerpiente);
    });
  }

  expandirSerpiente(cantidad: number) {
    this.nuevosSegmentos += cantidad;
  }

  obtenerCabezaSerpiente() {
    return this.cuerpoSerpiente[0];
  }

  interseccionSerpiente() {
    return this.enSerpiente(this.cuerpoSerpiente[0], { ignorarCabeza: true });
  }

  enSerpiente(posicion: any, { ignorarCabeza = false } = {}) {
    return this.cuerpoSerpiente.some((segmento, indice) => {
      if (ignorarCabeza && indice === 0) return false;
      return this.posicionesIguales(segmento, posicion);
    });
  }

  posicionesIguales(pos1: any, pos2: any) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
  }

  agregarSegmentos() {
    for (let i = 0; i < this.nuevosSegmentos; i++) {
      this.cuerpoSerpiente.push({ ...this.cuerpoSerpiente[this.cuerpoSerpiente.length - 1] });
    }

    this.nuevosSegmentos = 0;
  }
}
