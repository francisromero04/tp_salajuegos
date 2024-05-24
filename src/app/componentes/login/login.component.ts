import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BarranavComponent } from '../barranav/barranav.component';
import { FormBuilder,Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, BarranavComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {

  formulario :  FormGroup;
  isLoggedIn : boolean = false;

  constructor(public autenticacion : AuthService, public ruta : Router, public inicializador : FormBuilder){
      this.formulario = this.inicializador.group({
        email : ['',[Validators.required,  //VALIDADOR CAMPO VACIO
        Validators.email, //VALIDADOR FORMATO VALIDO DE CORREO
        Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")//VERIFICA QUE EL CORREO TENGA UN VALOR ADECUADO. EJEMPLO: francis@mail.com
        ]],
        password :['',[Validators.required ]] //VALIDADOR CAMPO VACIO
      })
  }

  get manejadorErrores(){
    return this.formulario?.controls;
  }

  async btnLogin() {
    try {
      await this.autenticacion.iniciarSesion(this.formulario.value.email, this.formulario.value.password);
      this.isLoggedIn = true;
      setTimeout(() => {
        this.isLoggedIn = false;
        // Credenciales válidas, redireccionar al usuario a la página de bienvenida
        this.ruta.navigate(['/home']);
      }, 1500);
    } catch (error) {
      console.log('Error al autenticar', error);
    }
  }

  btnLogout() {
    this.autenticacion.cerrarSesion();
    this.isLoggedIn = false;
    this.ruta.navigate(['/login']); // Redirigir al usuario a la página de inicio de sesión
  }

  autoLogin() {
    this.formulario.controls['email'].setValue(this.autenticacion.demoUser.email);
    this.formulario.controls['password'].setValue(this.autenticacion.demoUser.password);
  }

}
