import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Gift {
  id: string;
  name: string;
  reserved: boolean;
}

export interface Reservation {
  nome: string;
  presenteId: string;
}

// ── Dados de exemplo enquanto a API não está pronta ──────────────────────────
const MOCK_GIFTS: Gift[] = [
  { id: '1',  name: 'Jogo de Cama Queen',             reserved: false },
  { id: '2',  name: 'Jogo de Toalhas (6 peças)',       reserved: false },
  { id: '3',  name: 'Jogo de Panelas Antiaderente',    reserved: true  },
  { id: '4',  name: 'Liquidificador',                  reserved: false },
  { id: '5',  name: 'Cafeteira',                       reserved: false },
  { id: '6',  name: 'Air Fryer',                       reserved: false },
  { id: '7',  name: 'Micro-ondas',                     reserved: true  },
  { id: '8',  name: 'Ferro de Passar Roupa',           reserved: false },
  { id: '9',  name: 'Aspirador de Pó',                 reserved: false },
  { id: '10', name: 'Jogo de Talheres (24 peças)',     reserved: false },
  { id: '11', name: 'Jogo de Pratos (12 peças)',       reserved: false },
  { id: '12', name: 'Sanduicheira',                    reserved: false },
  { id: '13', name: 'Conjunto de Utensílios de Cozinha', reserved: false },
  { id: '14', name: 'Jogo de Copos (6 peças)',         reserved: false },
  { id: '15', name: 'Tapete para Sala',                reserved: false },
];

@Injectable({ providedIn: 'root' })
export class GiftService {
  private http = inject(HttpClient);

  // TODO: configure a URL base da API
  // private readonly apiUrl = 'https://sua-api.com';

  getGifts(): Observable<Gift[]> {
    // TODO: substituir pelo endpoint real:
    // return this.http.get<Gift[]>(`${this.apiUrl}/presentes`);
    return of(MOCK_GIFTS).pipe(delay(800));
  }

  reserveGift(data: Reservation): Observable<void> {
    // TODO: substituir pelo endpoint real:
    // return this.http.post<void>(`${this.apiUrl}/reservar`, data);
    console.log('Reserva enviada:', data);
    return of(undefined as void).pipe(delay(1000));
  }
}
