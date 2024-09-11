import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, ResolveFn, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';
import { Title } from '@angular/platform-browser';
import { TournamentService } from '../../services/tournament.service';

@Component({
  selector: 'app-single-user',
  standalone: true,
  imports: [],
  templateUrl: './single-user.component.html',
  styleUrl: './single-user.component.css'
})
export class SingleUserComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute)
  private usersService = inject(UsersService);
  private router = inject(Router);
  private titleService = inject(Title);
  private tournamentService = inject(TournamentService);
  user = signal<any | undefined>(undefined);
  userId: string = undefined;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.usersService.findById(params.id).subscribe({
        next: (user) => {
          this.user.set(user);
          this.userId = user['_id'];
          this.titleService.setTitle(`${user['name']}'s Profile`);
        },
        error: (error: Error) => {
          console.error(error.message);
        }
      });
    })
  }

  joinTournament() {
    this.tournamentService.joinTournament(this.userId)
      .subscribe({
        next: (response) => {
          if (response['message'] === "User already in the tournament") {
            alert('User is already on the tournament!');
          } else {
            console.log('User joined the tournament');
            this.router.navigate(['tournament']);
          }
        }
      })
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute })
  }

  onDelete() {
    if (confirm('Are you sure? :(')) {
      this.usersService.deleteUser(this.userId)
        .subscribe(() => {
          console.log('User Deleted...');
          this.router.navigate(['users']);
        });
    }
  }
}