import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router

  ) {}


  //Registro de usuario:
  async register(userData: any){
    return this.afAuth.createUserWithEmailAndPassword(userData.email, userData.password).then((res) => {
      const {email, name, lastname, age, phone, role} = userData;
      return this.firestore.collection('users').doc(res.user?.uid).set({
        uid: res.user?.uid,
        email,
        name,
        lastname,
        age,
        phone,
        role
      });


    });
    
  }

 

  //Iniciando sesión:
  login(email: string, password: string){
    return this.afAuth.signInWithEmailAndPassword(email,password);
  }

  //deslog:
  logout(){
    return this.afAuth.signOut().then(()=> this.router.navigate(['/login']));
  }

  //Obtener rol del usuario actual:
  getUserRole(uid: string){
    return this.firestore.collection('users').doc(uid).valueChanges();
   
  }

  get isLoggedIn(): boolean {
    return !!this.afAuth.currentUser;
  }

  
}
