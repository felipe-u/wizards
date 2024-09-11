import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { User } from '../models/user.model';
import { UserComponent } from './user/user.component';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UserComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  private usersService = inject(UsersService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  users = signal<any>([]);

  ngOnInit(): void {
    const subscription = this.usersService.getAllUsers().subscribe({
      next: (users) => {
        this.users.set(users)
      },
      error: (error: Error) => {
        console.error(error.message);
      }
    })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  visitCreateUserPage() {
    this.router.navigate(['create-user'])
  }
}
