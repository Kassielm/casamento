import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Gift {
  id: number;
  giftName: string;
  reserved: boolean;
  imageUrl: string;
  name: string | null;
}

export interface Reservation {
  giftName: string;
  personName: string;
}

@Injectable({ providedIn: 'root' })
export class GiftService {
  private http = inject(HttpClient);
  private readonly apiUrl = '/api';

  getGifts(): Observable<Gift[]> {
    return this.http.get<Gift[]>(`${this.apiUrl}/gifts`);
  }

  reserveGift(data: Reservation): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/gifts/reserve`, data);
  }
}
