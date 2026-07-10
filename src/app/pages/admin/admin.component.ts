import { Component, signal, inject, OnInit } from '@angular/core';
import { GiftService, Gift } from '../../services/gift.service';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  private giftService = inject(GiftService);

  gifts        = signal<Gift[]>([]);
  isLoading    = signal(true);
  errorMessage = signal<string | null>(null);
  removingId   = signal<number | null>(null);

  ngOnInit(): void {
    this.loadReserved();
  }

  loadReserved(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.giftService.getReservedGifts().subscribe({
      next: (gifts) => { this.gifts.set(gifts); this.isLoading.set(false); },
      error: () => {
        this.isLoading.set(false);
        this.errorMessage.set('Não foi possível carregar as reservas. Tente novamente.');
      },
    });
  }

  getImagePath(imageUrl: string): string {
    return `assets/presentes/${imageUrl}.jpeg`;
  }

  unreserve(gift: Gift): void {
    if (this.removingId() !== null) return;
    this.removingId.set(gift.id);
    this.giftService.unreserveGift(gift.id).subscribe({
      next: () => {
        this.gifts.update(gs => gs.filter(g => g.id !== gift.id));
        this.removingId.set(null);
      },
      error: () => {
        this.removingId.set(null);
        this.errorMessage.set(`Erro ao remover reserva de "${gift.giftName}". Tente novamente.`);
      },
    });
  }
}
