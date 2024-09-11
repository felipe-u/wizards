import { Component, inject, input } from '@angular/core';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  private router = inject(Router);
  user = input<User>();

  showInfo() {
    this.router.navigate(['users', this.user()._id])
  }
}
