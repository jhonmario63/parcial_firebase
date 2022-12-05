import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {

  recoverForm: FormGroup;

  constructor(private FB: FormBuilder,
    private AS: AuthService, private AC: AlertController, private router: Router) {
    this.buildForm();
  }

  ngOnInit() {
  }

  resetPassword(event: Event): void {
    event.preventDefault();
    if (this.recoverForm.valid) {
      const value = this.recoverForm.value;
      this.AS.rpassword(value.email).then(
        async () => {
          const alert = await this.AC.create({
            message: "Revisa tu correo, que te enviamos un link para que cambies tu contraseña. ",
            buttons: [{
              text: 'OK', role: 'cancel', handler: () => {
                this.router.navigateByUrl('login')
              }
            }],
          });
          await alert.present();
        },
        async error => {
          const Erroralert = await this.AC.create({
            message: error.message, buttons: [{ text: 'OK', role: 'cancel' }],
          });
          await Erroralert.present();
        }
      )
    };
  }

  buildForm() {
    this.recoverForm = this.FB.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  get emailField() {
    return this.recoverForm.get('email');
  }


}
