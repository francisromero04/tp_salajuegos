export class TableroDeJuego {
  private readonly TAMANO_REJILLA: number;

  constructor(tamanoRejilla: number = 15) {
    this.TAMANO_REJILLA = tamanoRejilla;
  }

  public posicionAleatoriaEnRejilla() {
    return {
      x: Math.floor(Math.random() * this.TAMANO_REJILLA) + 1,
      y: Math.floor(Math.random() * this.TAMANO_REJILLA) + 1
    };
  }

  public fueraDeRejilla(posicion: any) {
    return (
      posicion.x < 1 || posicion.x > this.TAMANO_REJILLA ||
      posicion.y < 1 || posicion.y > this.TAMANO_REJILLA
    );
  }
}
