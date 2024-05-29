export class Entrada {
  direccionEntrada = { x: 0, y: 0 };
  ultimaDireccionEntrada = { x: 0, y: 0 };

  obtenerEntradas() {
    window.addEventListener('keydown', e => {
      this.establecerDireccion(e.key);
    });
  }

  establecerDireccion(direccion: String) {
    switch (direccion) {
      case 'ArrowUp':
        if (this.ultimaDireccionEntrada.y !== 0) break;
        this.direccionEntrada = { x: 0, y: -1 };
        break;
      case 'ArrowDown':
        if (this.ultimaDireccionEntrada.y !== 0) break;
        this.direccionEntrada = { x: 0, y: 1 };
        break;
      case 'ArrowLeft':
        if (this.ultimaDireccionEntrada.x !== 0) break;
        this.direccionEntrada = { x: -1, y: 0 };
        break;
      case 'ArrowRight':
        if (this.ultimaDireccionEntrada.x !== 0) break;
        this.direccionEntrada = { x: 1, y: 0 };
        break;
    }
  }

  obtenerDireccionEntrada() {
    this.ultimaDireccionEntrada = this.direccionEntrada;
    return this.direccionEntrada;
  }
}
