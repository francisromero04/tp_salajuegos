import { Component, AfterViewChecked, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Mensaje } from '../../clases/mensaje.interface';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export default class ChatComponent {
  mensajes: Mensaje[] = [];
  nuevoMensaje: Mensaje = { emisor: '', texto: '', fecha: '' };
  usuario: any;
  suscripcion: any;
  @ViewChild('chatContainer') chatContainer?: any;

  constructor(
    private authService: AuthService,
    private mensajesService: ChatService
  ) {}

  ngAfterViewChecked() {
    this.scrollChatToBottom();
  }

  scrollChatToBottom() {
    try {
        this.chatContainer.nativeElement.scrollTop =
        this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.log(err);
    }
  }

  ngOnInit(): void {
    this.suscripcion = this.mensajesService.getMsg().subscribe((data) => {
      this.mensajes = data.map((e) => {
        return {
          id: e.id,
          ...(e as Mensaje),
        } as Mensaje;
      });
    });
    this.authService.getCurrentUser().then((user) => {
        this.usuario = user;
         console.log(user);
      }).catch((error) => {
        console.error('Ocurrió un error al obtener el usuario:', error);
      });
  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

  enviarMensaje(): void {
    this.nuevoMensaje.emisor = this.usuario?.email;
    this.nuevoMensaje.fecha = this.obtenerFecha();
    if (this.nuevoMensaje.texto !== '')
      this.mensajesService.addMsg(this.nuevoMensaje);
    this.nuevoMensaje = { emisor: '', texto: '', fecha: '' };
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
