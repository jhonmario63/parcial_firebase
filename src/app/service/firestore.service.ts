import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Concert } from '../song.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(public firestore: AngularFirestore) {
  }

  createConcert(concertName: string,
    costInput: Number,
    costConcert: Number,
    date: Date): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.doc(`concertList/${id}`).set({
      id, concertName, costInput, costConcert, date
    });
  }

  getConcertList(): AngularFirestoreCollection<Concert> {
    return this.firestore.collection(`concertList`);
  }

  getConcertDetails(concertId: string): AngularFirestoreDocument<Concert> {
    return this.firestore.collection(`concertList`).doc(concertId);
  }

  deleteConcert(concertId: string): Promise<void> {
    return this.firestore.doc(`concertList/${concertId}`).delete();
  }

}
