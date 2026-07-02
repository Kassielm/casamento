import { Component, signal, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GiftService, Gift } from '../../services/gift.service';

@Component({
  selector: 'app-lista-presentes',
  imports: [RouterLink],
  templateUrl: './lista-presentes.component.html',
  styleUrl: './lista-presentes.component.css',
})
export class ListaPresentesComponent {
  private giftService = inject(GiftService);

  guestName    = signal('');
  selectedGift = signal<Gift | null>(null);
  isModalOpen  = signal(false);
  gifts        = signal<Gift[]>([]);
  isLoading    = signal(false);
  isSubmitting = signal(false);
  submitted    = signal(false);
  errorMessage = signal<string | null>(null);

  canConfirm = computed(
    () => this.guestName().trim().length > 0 && this.selectedGift() !== null
  );

  onNameInput(event: Event): void {
    this.guestName.set((event.target as HTMLInputElement).value);
  }

  openModal(): void {
    this.isModalOpen.set(true);
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

  selectGift(gift: Gift): void {
    if (gift.reserved) return;
    this.selectedGift.set(gift);
    this.isModalOpen.set(false);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  confirm(): void {
    const gift = this.selectedGift();
    const name = this.guestName().trim();
    if (!name || !gift || this.isSubmitting()) return;

    this.isSubmitting.set(true);
    this.errorMessage.set(null);
    this.giftService.reserveGift({ nome: name, presenteId: gift.id }).subscribe({
      next: () => { this.isSubmitting.set(false); this.submitted.set(true); },
      error: () => {
        this.isSubmitting.set(false);
        this.errorMessage.set('Erro ao confirmar reserva. Tente novamente.');
      },
    });
  }
}
