import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { UsersService } from '../services/users.service';
import { TournamentService } from '../services/tournament.service';

@Component({
  selector: 'app-tournament',
  standalone: true,
  imports: [],
  templateUrl: './tournament.component.html',
  styleUrl: './tournament.component.css'
})
export class TournamentComponent implements OnInit {
  private tournamentService = inject(TournamentService);
  private destroyRef = inject(DestroyRef);
  users = signal<any>([]);

  ngOnInit(): void {
    const subscription = this.loadUsers();
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  onQuitTournament(userId: any) {
    this.tournamentService.quitTournament(userId).subscribe({
      next: () => {
        this.loadUsers();
      },
      error: (error: Error) => {
        console.error(error.message);
      }
    })
  }

  private loadUsers() {
    return this.tournamentService.getAllUsers().subscribe({
      next: (users) => {
        this.users.set(users)
      },
      error: (error: Error) => {
        console.error(error.message);
      }
    })
  }

  onShow() {
    console.log(this.users());
  }
}
