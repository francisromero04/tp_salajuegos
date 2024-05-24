import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Juego } from '../../../clases/juego';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { BarranavComponent } from '../../barranav/barranav.component';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [CommonModule, BarranavComponent],
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss'],
})
export default class AhorcadoComponent {
  public palabras: string[] = [
    'biblioteca',
    'mariposa',
    'elefante',
    'guitarra',
    'computadora',
    'television',
    'refrigerador',
    'matematicas',
    'universidad',
    'restaurantes',
    'supermercado',
    'fotografia',
    'cumpleaños',
    'automovil',
    'bicicleta',
    'helicoptero',
    'jirafa',
    'cocodrilo',
    'hipopotamo',
    'constelacion',
    'astronomia',
    'geografia',
    'arqueologia',
    'biologia',
    'quimica',
  ];

  public abecedario: string[] = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];

  constructor(private authService: AuthService) {
    this.palabraJuego = '_ '.repeat(this.palabra.length);
  }

  public palabraJuego: string = '';
  public palabra: string =
  this.palabras[Math.floor(Math.random() * this.palabras.length)];
  public intentos: number = 0;
  public puntaje: number = 0;
  public partida: boolean | undefined = undefined;
  public botonClick: { [letra: string]: boolean } = {};

  comprobarClick(letra: string) {
    if (!this.botonClick[letra]) {
      this.comprobarLetra(letra);

      const arrPalabra = this.palabraJuego.split(' ');

      for (let i = 0; i <= this.palabra.length; i++) {
        if (this.palabra[i] === letra) {
          arrPalabra[i] = letra;
        }
      }
      this.palabraJuego = arrPalabra.join(' ');
      this.botonClick[letra] = true;
      this.verificarEstado();
    }
  }

  comprobarLetra(letra: string) {
    if (this.palabra.indexOf(letra) == -1) {
      this.intentos++;
    }
  }

  public verificarEstado() {
    const palabraArr = this.palabraJuego.split(' ');
    const palabraChekear = palabraArr.join('');

    if (palabraChekear === this.palabra) {
      this.partida = true;
      this.alertaGanador();
    } else if (this.intentos === 6) {
      this.partida = false;
      this.alertaPerdedor();
    }
  }

  alertaGanador() {
    this.puntaje = 1;
    this.guardarPuntuacion();
    Swal.fire({
      title: 'Felicitaciones, adivinaste la palabra',
      icon: 'success',
      color: '#000000',
      background: '#D3D3D3',
      confirmButtonColor: '#0f0',
      confirmButtonText: 'Continue',
    });
  }

  public alertaPerdedor() {
    this.puntaje = 0;
    this.guardarPuntuacion();
    Swal.fire({
      title: 'Perdiste, te quedaste sin intentos',
      icon: 'error',
      confirmButtonColor: '#E33939',
      padding: '3em',
      color: '#000000',
      background: '#D3D3D3',
      confirmButtonText: 'Retry',
      text: 'La palabra era: ' + this.palabra,
    });
  }

  reiniciar() {
    window.location.reload();
  }
  
  async guardarPuntuacion() {
    const dateDay = this.obtenerFecha();
    try {
      const username: any = await this.authService.getCurrentUser();
      if (username) {
        const name = username.email;
        const juego = new Juego(name, dateDay, this.puntaje, 'Ahorcado');
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
