import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
    private httpClient = inject(HttpClient);
    private users = signal<any>([]);
    url = 'http://localhost:3000/';

    getAllUsers() {
        return this.fetchUsers(this.url + 'users')
            .pipe(
                tap({
                    next: (users) => this.users.set(users)
                })
            );
    }

    createUser(user: User) {
        return this.httpClient
            .post(this.url + 'create-user', user)
    }

    editUser(user: User) {
        return this.httpClient
            .post(this.url + 'edit-user', user)
    }

    deleteUser(userId: string) {
        console.log(userId);
        return this.httpClient
            .post(this.url + 'delete-user', { userId });
    }

    findById(userId: string) {
        return this.httpClient.get(this.url + 'users/' + userId);
    }

    private fetchUsers(url: string) {
        return this.httpClient
            .get<any>(url)
            .pipe(
                map((resData) => resData.users)
            )
    }

}