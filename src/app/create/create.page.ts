import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../service/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  public createConcertForm: any;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public firestoreService: FirestoreService,
    formBuilder: FormBuilder, public router: Router) {

    this.createConcertForm = formBuilder.group({
      concertName: ['', Validators.required],
      costInput: ['', Validators.required],
      costConcert: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit() { }

  async createConcert() {
    const loading = await this.loadingCtrl.create();
    const concertName = this.createConcertForm.value.concertName;
    const costInput = this.createConcertForm.value.costInput;
    const costConcert = this.createConcertForm.value.costConcert;
    const date = this.createConcertForm.value.date;
    this.firestoreService.createConcert(concertName, costInput, costConcert, date).then(
      () => {
        loading.dismiss().then(() => {
          this.router.navigateByUrl('');
        });
      },
      error => {
        console.error(error);
      });

    return await loading.present();

  }

}
