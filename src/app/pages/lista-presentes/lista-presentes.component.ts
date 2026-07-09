import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GiftService, Gift } from '../../services/gift.service';

@Component({
  selector: 'app-lista-presentes',
  imports: [RouterLink],
  templateUrl: './lista-presentes.component.html',
  styleUrl: './lista-presentes.component.css',
})
export class ListaPresentesComponent implements OnInit {
  private giftService = inject(GiftService);

  gifts         = signal<Gift[]>([]);
  isLoading     = signal(true);
  errorMessage  = signal<string | null>(null);

  pendingGift   = signal<Gift | null>(null);
  guestName     = signal('');
  isSubmitting  = signal(false);
  submitError   = signal<string | null>(null);
  successGiftId = signal<number | null>(null);

  canConfirm = computed(
    () => this.guestName().trim().length > 0 && this.pendingGift() !== null
  );

  ngOnInit(): void {
    this.loadGifts();
  }

  loadGifts(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.giftService.getGifts().subscribe({
      next: (gifts) => { this.gifts.set(gifts); this.isLoading.set(false); },
      error: () => {
        this.isLoading.set(false);
        this.errorMessage.set('Não foi possível carregar a lista. Tente novamente.');
      },
    });
  }

  getImagePath(imageUrl: string): string {
    return `assets/presentes/${imageUrl}.jpeg`;
  }

  openReserveModal(gift: Gift): void {
    if (gift.reserved) return;
    this.pendingGift.set(gift);
    this.guestName.set('');
    this.submitError.set(null);
  }

  closeModal(): void {
    this.pendingGift.set(null);
    this.submitError.set(null);
  }

  onNameInput(event: Event): void {
    this.guestName.set((event.target as HTMLInputElement).value);
  }

  confirm(): void {
    const gift = this.pendingGift();
    const name = this.guestName().trim();
    if (!name || !gift || this.isSubmitting()) return;

    this.isSubmitting.set(true);
    this.submitError.set(null);
    this.giftService.reserveGift({ nome: name, presenteId: gift.id }).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.successGiftId.set(gift.id);
        this.gifts.update(gs => gs.map(g => g.id === gift.id ? { ...g, reserved: true } : g));
        this.pendingGift.set(null);
      },
      error: () => {
        this.isSubmitting.set(false);
        this.submitError.set('Erro ao confirmar reserva. Tente novamente.');
      },
    });
  }
}
