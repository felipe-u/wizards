import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TournamentService {
    private httpClient = inject(HttpClient);
    private users = signal<any>([]);
    url = 'http://localhost:3000/tournament/';

    getAllUsers() {
        return this.fetchUsers(this.url + 'all')
            .pipe(
                tap({
                    next: (users) => this.users.set(users)
                })
            );;
    }

    joinTournament(userId: string) {
        return this.httpClient
            .post(this.url + 'join', { userId })
    }

    quitTournament(userId: string) {
        return this.httpClient
            .post(this.url + 'quit', { userId })
    }

    private fetchUsers(url: string) {
        return this.httpClient
            .get<any>(url)
            .pipe(
                map((resData) => resData.users)
            )
    }
}