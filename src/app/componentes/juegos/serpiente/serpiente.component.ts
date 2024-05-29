import { Component } from '@angular/core';
import { AfterViewInit, OnInit } from '@angular/core';
import { Serpiente } from '../../../clases/serpiente';
import { Comida } from '../../../clases/comida';
import { TableroDeJuego } from '../../../clases/tablero';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-serpiente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './serpiente.component.html',
  styleUrl: './serpiente.component.css'
})
export default class SerpienteComponent implements OnInit, AfterViewInit {
  titulo = 'juegoDeLaSerpiente1938web';
  tableroDeJuego: any;
  serpiente = new Serpiente();
  comida = new Comida(this.serpiente);
  tablero = new TableroDeJuego(); // Instancia de la clase TableroDeJuego

  ultimoTiempoDeRenderizado = 0;
  juegoTerminado = false;
  esPantallaCompleta = false;

  ngAfterViewInit() {
    this.tableroDeJuego = document.querySelector('.game-board'); // Cambiado a '.game-board'
    if (this.tableroDeJuego) {
      window.requestAnimationFrame(this.iniciar.bind(this));
    }
  }

  ngOnInit(): void {
    this.serpiente.escucharEntradas();
    document.addEventListener('keydown', this.enTeclaPresionada.bind(this));
  }

  iniciar(tiempoActual: any) {
    if (this.juegoTerminado) {
      return console.log('Juego Terminado');
    }

    window.requestAnimationFrame(this.iniciar.bind(this));
    const segundosDesdeUltimoRenderizado = (tiempoActual - this.ultimoTiempoDeRenderizado) / 1000;
    if (segundosDesdeUltimoRenderizado < 1 / this.velocidadSerpiente) {
      return;
    }
    this.ultimoTiempoDeRenderizado = tiempoActual;

    this.actualizar();
    this.dibujar();
  }

  actualizar() {
    this.serpiente.actualizar();
    this.comida.actualizar();
    this.verificarMuerte();
  }

  dibujar() {
    this.tableroDeJuego.innerHTML = '';
    this.serpiente.dibujar(this.tableroDeJuego);
    this.comida.dibujar(this.tableroDeJuego);
  }

  verificarMuerte() {
    this.juegoTerminado = this.tablero.fueraDeRejilla(this.serpiente.obtenerCabezaSerpiente()) || this.serpiente.interseccionSerpiente();
    if (!this.juegoTerminado) {
      return;
    }
    this.tableroDeJuego.classList.add('blur');
  }

  get velocidadSerpiente() {
    const puntaje = this.comida.puntajeActual;
    if (puntaje < 10) {
      return 4;
    }
    if (puntaje > 10 && puntaje < 15) {
      return 5;
    }
    if (puntaje > 15 && puntaje < 20) {
      return 6;
    }
    return 7;
  }

  restartGame() {
    // Reinicia todas las variables necesarias para iniciar un nuevo juego
    this.serpiente = new Serpiente();
    this.comida = new Comida(this.serpiente);
    this.juegoTerminado = false;

    // Remover la clase .blur del tableroDeJuego
    if (this.tableroDeJuego) {
      this.tableroDeJuego.classList.remove('blur');
    }

    // Vuelve a iniciar el juego
    this.iniciar(0);
  }

  enTeclaPresionada(evento: KeyboardEvent) {
    if (evento.key === 'Escape' && this.esPantallaCompleta) {
      document.exitFullscreen();
    } else if (['ArrowUp', 'ArrowDown'].includes(evento.key)) {
      evento.preventDefault(); // Evitar el comportamiento predeterminado de desplazamiento
    }
  }
}
