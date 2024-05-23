import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-barranav',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './barranav.component.html',
  styleUrl: './barranav.component.css'
})
export class BarranavComponent implements OnInit {
  constructor(private authService: AuthService, private ruta: Router) {}
  usuarioConectado = this.authService.obtenerUsuarioConectado();
  correoUsuario: string | null = null; // Cambia el tipo de correoUsuario
  mostrarCorreo: boolean = false;

  ngOnInit() {
    this.usuarioConectado.subscribe(user => {
      if (user) {
        this.correoUsuario = user.email;
        this.mostrarCorreo = true; // Mostrar el correo cuando el usuario esté conectado
      } else {
        this.mostrarCorreo = false; // Ocultar el correo cuando el usuario no esté conectado
      }
    });
  }

  logout() {
    this.authService.cerrarSesion();
    this.correoUsuario = null; // Limpiar el correo cuando el usuario cierre sesión
    this.mostrarCorreo = false; // Ocultar el correo al cerrar sesión
    this.ruta.navigate(['/login']);
  }
}
