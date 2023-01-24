import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  getDoc,
  setDoc,
  where,
} from '@angular/fire/firestore';

import {
  DocumentSnapshot,
  endAt,
  increment,
  limit,
  limitToLast,
  orderBy,
  startAfter,
} from 'firebase/firestore';
import { UserData } from '../structures/user.structure';``
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  storage = getStorage();

  constructor(private fs: Firestore) {}

  async upload(
    path: string,
    file: File | ArrayBuffer | Blob | Uint8Array
  ): Promise<any> {
    // const ext = file!.name.split('.').pop();
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        await task;
        const url = await getDownloadURL(storageRef);
        return url;
      } catch (e: any) {
        console.error(e);
        return e;
      }
    } else {
      // handle invalid file
      return false;
    }
  }

  getCounters() {
    return getDoc(doc(this.fs, 'sitedata/counters/'));
  }

  getSeats() {
    return getDoc(doc(this.fs, 'sitedata/seats/'));
  }

  async addUser(user: UserData) {
    // await updateDoc(doc(this.fs, 'sitedata/counters'), {
    //   totalUsers: increment(1),
    // });
    // await this.updateUserAnalytics('added');
    return addDoc(collection(this.fs, 'users'), user);
  }

        getAllUsers() {
    return getDocs(
      query(
        collection(this.fs, 'users'),
        orderBy('name')
      )
    );
  }

  getActiveUsers() {
    return getDocs(
      query(
        collection(this.fs, 'users'),
        where('activeNow', '==', true),
        orderBy('name')
      )
    );
  }

  getFirstUsers(length: number,access:string) {
    return getDocs(
  query(
    collection(this.fs, 'users'),
    orderBy('emailVerified'),
    where('access', '==', access),
    limit(length)
  )
    );
  }

  getNextUsers(length: number, lastDocument: DocumentSnapshot) {
    return getDocs(
      query(
        collection(this.fs, 'users'),
        orderBy('name'),
        where('access', '==', 'user'),
        limit(length),
        startAfter(lastDocument)
      )
    );
  }

  getPreviousUsers(length: number, firstDocument: DocumentSnapshot) {
    return getDocs(
      query(
        collection(this.fs, 'users'),
        orderBy('name'),
        where('access', '==', 'user'),
        limitToLast(length),
        endAt(firstDocument)
      )
    );
  }

  editUser(userId: string, user: UserData) {
    return updateDoc(doc(this.fs, 'users/' + userId), user);
  }

  async deleteUser(userId: string) {
    await updateDoc(doc(this.fs, 'sitedata/counters'), {
      totalUsers: increment(-1),
    });
    this.updateUserAnalytics('deleted');
    return deleteDoc(doc(this.fs, 'users/' + userId));
  }

  ///getUsers
  getUser(id: string) {
    return getDoc(doc(this.fs, 'users/' + id));
  }

  updateUserAnalytics(user: 'added' | 'deleted') {
    const today = new Date();
    const docId = today.getMonth().toString() + today.getFullYear().toString();
    return setDoc(
      doc(this.fs, 'analytics/' + docId),
      {
        users: user == 'added' ? increment(1) : increment(-1),
      },
      { merge: true }
    );
  }

  updateEarningAnalytics(amount: number) {
    const today = new Date();
    const docId = today.getMonth().toString() + today.getFullYear().toString();
    return setDoc(
      doc(this.fs, 'analytics/' + docId),
      {
        earnings: increment(amount),
      },
      { merge: true }
    );
  }

  getAnalytics(month: number, year: number) {
    return getDoc(
      doc(this.fs, 'analytics/' + month.toString() + year.toString())
    );
  }

  
  getAllNotification() {
    return getDocs(query(collection(this.fs, 'admin-notifications'), orderBy('timestamp')));
  }
  
  updateSettings(settings: any) {
    return setDoc(doc(this.fs, 'sitedata/settings'), settings, { merge: true });
  }

}
