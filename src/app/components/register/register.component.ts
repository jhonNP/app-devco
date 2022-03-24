import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/Usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: UsuarioModel= new UsuarioModel() ;

  constructor(private auth: AuthService, private router: Router) {

  }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm) {

    if(form.invalid){
      return ;
    }

    Swal.fire({
      allowOutsideClick:false,
      icon:'info',
      text:'Espere por favor...'
    });

    Swal.showLoading();

   this.auth.register(this.user)
   .subscribe(response=>{
     Swal.close();
     console.log(response);
   }, err=>{
    Swal.fire({
      allowOutsideClick:false,
      icon:'error',
      title:'Error al autenticar',
      text:err.error.error.message
    });
     console.log(err);
   });

  }

}
