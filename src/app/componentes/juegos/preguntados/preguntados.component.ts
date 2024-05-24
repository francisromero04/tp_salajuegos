import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Pregunta } from '../../../clases/pregunta.interface';
import { PreguntadosService } from '../../../services/preguntados.service';
import Swal from 'sweetalert2';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { Juego } from '../../../clases/juego';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export default class PreguntadosComponent {
  constructor(
    private preguntadosService: PreguntadosService,
    private sanitizer: DomSanitizer,
    private authService: AuthService
  ) {}

  opciones: string[] = ['Opcion 1', 'Opcion 2 ', 'Opcion 3', 'Opcion 4'];
  puntaje: number = 0;
  categoria: string = '';
  public pregunta: string | undefined;
  public preguntaAPI!: Pregunta;
  respuesta: string = '';
  intervalo: any;

  time = 30;
  stop$ = new Subject();

  ngOnInit() {
    this.jugar();
  }

  ngOnDestroy() {
    this.stopCronometro();
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
  }

  jugar() {
    this.getPregunta();
    this.puntaje = 0;
    this.time = 30;
    this.startCronometro();
  }

  getPregunta() {
    this.preguntadosService.getPreguntaAPI().subscribe((pregunta) => {
      this.preguntaAPI = pregunta;
      console.log(pregunta);
      this.categoria = this.preguntaAPI.results[0].category;
      this.pregunta = this.preguntaAPI.results[0].question;
      this.opciones = this.preguntaAPI.results[0].incorrect_answers;
      this.opciones.push(this.preguntaAPI.results[0].correct_answer);
      this.opciones.sort(() => Math.random() - 0.5);
      this.respuesta = this.preguntaAPI.results[0].correct_answer;
      console.log(this.preguntaAPI.results[0].correct_answer);
    });
  }

  comprobar(opcion: string) {
    if (opcion == this.respuesta) {
      this.puntaje++;
      if (this.puntaje == 2) {
        this.guardarPuntuacion();
        this.alertaGanador();
      } else this.continuar();
    } else {
      this.guardarPuntuacion();
      this.puntaje = 0;
      this.alertaPerdedor();
    }
  }

  continuar() {
    this.getPregunta();
    this.time = 30;
  }

  decodeHtml(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  stopCronometro() {
    this.stop$.next(null);
  }

  startCronometro() {
    this.stop$ = new Subject();
    this.intervalo = interval(1000)
      .pipe(takeUntil(this.stop$))
      .subscribe(() => {
        if (this.time == 0) {
          this.alertaTiempo();
        } else {
          this.time--;
        }
      });
  }

  alertaPerdedor() {
    this.stopCronometro();
    Swal.fire({
      title: 'Perdiste',
      icon: 'error',
      text: 'La respuesta correcta era: ' + this.respuesta,
      confirmButtonColor: '#E33939',
      color: '#000000',
      confirmButtonText: 'Retry',
      background: '#fff',
    }).then(() => {
      this.jugar();
    });
  }

  alertaGanador() {
    this.stopCronometro();
    Swal.fire({
      title: 'Ganaste',
      icon: 'success',
      color: '#000000',
      confirmButtonColor: '#0f0',
      confirmButtonText: 'Continue',
      background: '#fff',
    }).then(() => {
      this.jugar();
    });
  }

  alertaTiempo() {
    this.stopCronometro();
    Swal.fire({
      title: 'Perdiste',
      icon: 'error',
      text: 'Se te acabo el tiempo para responder',
      confirmButtonColor: '#E33939',
      color: '#000000',
      confirmButtonText: 'Retry',
      background: '#fff',
    }).then(() => {
      this.jugar();
    });
  }

  async guardarPuntuacion() {
    const dateDay = this.obtenerFecha();
    try {
      const username: any = await this.authService.getCurrentUser();
      if (username) {
        const name = username.email;
        const juego = new Juego(name, dateDay, this.puntaje, 'Preguntados');
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
