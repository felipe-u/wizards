import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit {
  private router = inject(Router);
  private usersService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  editMode = input.required<boolean>();
  user = signal<any | undefined>(undefined);
  userId: string = null;

  form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required]
    }),
    age: new FormControl('', {
      validators: [Validators.required]
    }),
    imageUrl: new FormControl('', {
      validators: [Validators.required]
    })
  })

  ngOnInit(): void {
    if (this.editMode()) {
      const subscription = this.activatedRoute.params
        .subscribe(params => {
          this.usersService.findById(params.id).subscribe({
            next: (user) => {
              this.user.set(user);
              this.userId = params['id'];
              this.form.patchValue({
                name: this.user().name,
                imageUrl: this.user().imageUrl,
                age: this.user().age
              })
              console.log(this.user())
            },
            error: (error: Error) => {
              console.error(error.message);
            }
          });
        })
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      })
    }
  }

  onSubmit() {
    if (confirm("Click OK if you wanna submit")) {
      const newUserName = this.form.value.name;
      const newUserAge = +this.form.value.age;
      const newUserImageUrl = this.form.value.imageUrl;
      if (this.editMode()) {
        const updatedUser = new User(this.userId,
          newUserName, newUserImageUrl, newUserAge
        );
        this.usersService.editUser(updatedUser).subscribe();
        this.router.navigate(['../'], { relativeTo: this.activatedRoute });
      } else {
        const newUser = new User(null,
          newUserName, newUserImageUrl, newUserAge
        );
        this.usersService.createUser(newUser).subscribe();
        this.form.reset();
        this.router.navigate(['/users']);
      }
    }
  }

  onReset() {
    this.form.reset();
  }

  goBack() {
    this.router.navigate(['/users']);
  }
}
