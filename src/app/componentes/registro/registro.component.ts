import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {  Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BarranavComponent } from '../barranav/barranav.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, BarranavComponent, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export default class RegistroComponent {
  formulario : FormGroup;
  estaRegistrado : boolean = false;

  constructor(public autenticacion : AuthService, public ruta : Router, public inicializador : FormBuilder){

    this.formulario = this.inicializador.group({
      correo : ['',[Validators.required, //VALIDADOR CAMPO VACIO
        Validators.email, //VALIDADOR FORMATO VALIDO DE CORREO
        Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")]], //VERIFICA QUE EL CORREO TENGA UN VALOR ADECUADO. EJEMPLO: francis@mail.com
      pass :['',[Validators.required ]] //VALIDADOR CAMPO VACIO
    })   

  }

  get manejadorErrores(){
    return this.formulario?.controls;
  }

  async botonRegistrar() {
    try {
      const { correo, pass } = this.formulario.value;
      const credenciales = await this.autenticacion.registro(correo, pass);

      if (credenciales) {
        this.autenticacion.guardarInfoLogin(correo);

        this.estaRegistrado = true;
        setTimeout(() => {
        this.estaRegistrado = false;
        // Credenciales válidas, redireccionar al usuario a la página de bienvenida
        this.ruta.navigate(['/home']);
        }, 2000);

      } else {
        console.log('Error al autenticar');
      }
    } catch (error) {
      console.log(error);
    }
  }

}
