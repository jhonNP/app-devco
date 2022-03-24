import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'my-app-devco';

  isAuthenticated = false;

  constructor(private auth: AuthService, private router: Router){
      this.isAuthenticated=auth.isAuthenticated();
  }

  exit(){

    if(this.auth.isAuthenticated()){
      Swal.fire({
        allowOutsideClick:false,
        text:'¿Deseas cerrar sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.isConfirmed) {
          this.auth.logaut();
          Swal.close();
          this.router.navigate(['/login']);
        }
      });


    }
  }

  ngOnInit() {
    console.log("App Componet cargado")
  }
}
