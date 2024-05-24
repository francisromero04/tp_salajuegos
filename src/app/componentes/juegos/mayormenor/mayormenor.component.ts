import { Component } from '@angular/core';
import { Juego } from '../../../clases/juego';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { BarranavComponent } from '../../barranav/barranav.component';

@Component({
  selector: 'app-mayormenor',
  standalone: true,
  imports: [CommonModule, BarranavComponent],
  templateUrl: './mayormenor.component.html',
  styleUrl: './mayormenor.component.css'
})
export default class MayormenorComponent {
  Cartas: string[] = [];

  constructor(private authService: AuthService) {
    for (let numero = 1; numero <= 12; numero++) {
      for (const palo of ['basto', 'copa', 'espada', 'oro']) {
        this.Cartas.push(this.getCardPath(numero, palo));
      }
    }
  }

  cartaAnterior: string = '';
  cartaNueva: string = '';
  puntaje: number = 0;
  mayor: boolean = false;
  mazo: string[] = [...this.Cartas];

  getCardPath(numero: number, palo: string): string {
    var path = `assets/Cartas/${numero}de${palo}.png`;
    //console.log(path);
    return path;
  }

  ngOnInit() {
    this.mazo = [...this.Cartas];
    this.elegirCarta();
  }

  comprobar(mayor: boolean) {
    this.cartaAnterior = this.cartaNueva;

    this.elegirCarta();
    let valorAnterior = this.obtenerValorNumerico(this.cartaAnterior);
    let valorNueva = this.obtenerValorNumerico(this.cartaNueva);
    if (
      (mayor && valorNueva! > valorAnterior!) ||
      (!mayor && valorNueva! < valorAnterior!) ||
      valorNueva == valorAnterior
    ) {
      this.puntaje++;
      if (this.puntaje === this.Cartas.length) this.mostrarAlertaGanador();
    } else {
      this.mostrarAlertaPerdedor();
    }
  }

  elegirCarta() {
    const index = Math.floor(Math.random() * this.mazo.length);
    this.cartaNueva = this.mazo[index];
    //  console.log(this.mazo);
    this.mazo.splice(index, 1);
  }

  obtenerValorNumerico(cartaNombre: string): number | null {
    console.log(cartaNombre);
    const numeroCarta = cartaNombre.match(/\d+/);
    return numeroCarta ? parseInt(numeroCarta[0]) : null;
  }

  reiniciarJuego() {
    this.puntaje = 0;
    this.mazo = [...this.Cartas];
    this.elegirCarta();
    this.cartaAnterior = '';
  }

  mostrarAlertaGanador() {
    this.guardarPuntuacion();
    Swal.fire({
      title: '¡Ganaste!',
      icon: 'success',
      text: 'Has alcanzado el puntaje máximo y el mazo está vacío.',
      confirmButtonColor: '#4CAF50',
      confirmButtonText: 'Reiniciar',
      background: '#fff',
    }).then(() => {
      this.reiniciarJuego();
    });
  }

  mostrarAlertaPerdedor() {
    this.guardarPuntuacion();
    Swal.fire({
      title: 'Perdiste',
      icon: 'error',
      text: `Tu puntaje es: ${this.puntaje}`,
      confirmButtonColor: '#E33939',
      confirmButtonText: 'Reintentar',
      background: '#fff',
    }).then(() => {
      this.reiniciarJuego();
    });
  }

  async guardarPuntuacion() {
    const dateDay = this.obtenerFecha();
    try {
      const username: any = await this.authService.getCurrentUser();
      if (username) {
        const name = username.email;
        const juego = new Juego(name, dateDay, this.puntaje, 'Mayor Menor');
        await this.authService.guardarResultadoJuegoBD(juego);
      } else {
        console.log('No se pudo obtener el usuario.');
      }
    } catch (error) {
      console.error('Error al guardar la puntuación:', error);
    }
  }
  obtenerFecha(): string {
    let ahora = new Date();
    let dia = ahora.getDate();
    let mes = ahora.getMonth() + 1;
    let año = ahora.getFullYear();
    let horas = ahora.getHours();
    let minutos = ahora.getMinutes();
    let segundos = ahora.getSeconds();
    let diaStr = dia < 10 ? '0' + dia.toString() : dia.toString();
    let mesStr = mes < 10 ? '0' + mes.toString() : mes.toString();
    let segSrt =
      segundos < 10 ? '0' + segundos.toString() : segundos.toString();
    let minStr = minutos < 10 ? '0' + minutos.toString() : minutos.toString();
    let fechaFormateada = `${diaStr}/${mesStr}/${año} ${horas}:${minStr}:${segSrt}`;

    return fechaFormateada;
  }

}
