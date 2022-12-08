import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Concert } from '../song.interface';
import { FirestoreService } from '../service/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  concertList: any = [];
  constructor(
    private firestoreService: FirestoreService, private router: Router
  ) { }

  ngOnInit() {
    this.concertList = this.firestoreService.getConcertList().valueChanges();
  }

}
