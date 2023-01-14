import { Timestamp } from '@angular/fire/firestore';
export type UserData = {
  id?: string;
  photoURL: string;
  address: string;
  stateName: string;
  cityName: string;
  countryName: string;
  totalOrders:number;
  phone: string;
  email:string;
  name: string;
  access: 'user' | 'admin' | 'agent';
  emailVerified: boolean;
  dob?: any;
  created?: Timestamp;
};