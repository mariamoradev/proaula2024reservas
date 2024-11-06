import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ToastService } from 'src/app/shared/services/toast.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public email!: FormControl;
  public password!: FormControl;
  public loginForm!: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly toastService: ToastService,
    private readonly navCtrl: NavController,
    private loadingService: LoadingService,
    private router: Router
  ) {
    this.initForm();
  }


  public async doLogin() {
    
    try {
      
      const { email, password } = this.loginForm.value;
      await this.authService.login(email, password);
      
      this.navCtrl.navigateForward("home");
      
      //Mensaje de bienvenida en caso de exito:
      this.toastService.presentToast('Welcome, dear user', 2000, 'top');
    }catch(error){
      
      this.toastService.presentErrorToast('Invalid email or password, please try again');
    }
  }

  private initForm(){
    this.email = new FormControl('', [Validators.email, Validators.required]);
    this.password = new FormControl('', [Validators.required]);
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }
}
