import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './Components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { LogoComponent } from './Components/logo/logo.component';
import { InputComponent } from './Components/input/input.component';
import { ButtonComponent } from './Components/button/button.component';


const COMPONENTS = [
  HeaderComponent, LogoComponent, InputComponent, ButtonComponent
]

const MODULES = [ 
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  IonicModule
  
]



@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...COMPONENTS,ReactiveFormsModule, ...MODULES]
})
export class SharedModule { }
