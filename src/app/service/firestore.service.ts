import { Injectable } from '@angular/core';
import {AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { Song } from '../song.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: AngularFirestore) { 

  }

  createSong(albumName: string,
    artistName: string,
    songDescription: string,
    songName: string): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.doc(`songList/${id}`).set({
      id, albumName, artistName, songDescription, songName,

    });
  }

  getSongList(): AngularFirestoreCollection<Song> {
    return this.firestore.collection(`songList`);
  }

  getSongDetails(songId: string): AngularFirestoreDocument<Song> {
    return this.firestore.collection(`songList`).doc(songId);
  }

  deleteSong(songId: string): Promise<void> {
    return this.firestore.doc(`songList/${songId}`).delete();
  }

}
