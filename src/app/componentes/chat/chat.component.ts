import { Component, AfterViewChecked, ViewChild, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarranavComponent } from '../barranav/barranav.component';
import { Usuario } from '../../clases/usuario';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, BarranavComponent],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export default class ChatComponent implements OnInit{
  mensajes: any [] = [];
  usuario: any;
  mensajeNuevo: Usuario;
  cargandoMensajes: boolean = true;

  constructor(private authService: AuthService, private mensajesService: ChatService) {

  }

  ngOnInit():void{
    this.mensajesService.getMsg().subscribe(mensajes => {
      this.mensajes = mensajes;
      this.cargandoMensajes = false; // Indica que los mensajes se han cargado
    });

    this.mensajeNuevo = {};
    this.authService.obtenerUsuarioConectado().subscribe(user => {

    });
    this.authService.getCurrentUser().then((user) => {
    this.usuario = user;
    console.log(user);
    }).catch((error) => {
      console.error('Ocurrió un error al obtener el usuario:', error);
    });

    this.mensajesService.getMsg().subscribe(mensajes => {
    this.mensajes = mensajes;
    });
  }

  enviarMensaje(): void {
    this.authService.obtenerDatosUsuario().then(user => { //traje datos usuario
    const infoMensaje : Usuario = {
      uid:user.uid,
      email:user.email,
      mensaje:this.mensajeNuevo.mensaje,
      fechaHorario:Timestamp.now()};
      this.mensajeNuevo = infoMensaje;
      this.mensajesService.addMsg(this.mensajeNuevo);
      this.mensajeNuevo.mensaje = " ";
    }).catch(error=>{
      console.log("error.",error);
    })

  }
}
