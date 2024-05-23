import { Component } from '@angular/core';
import { BarranavComponent } from '../barranav/barranav.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BarranavComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent {
  usuarioConectado : any;

  constructor(private auth:AuthService){}

  ngOnInit(): void {
    this.auth.obtenerUsuarioConectado().subscribe(usuario=>{
      this.usuarioConectado = usuario;
    }); 
  }
  
}
