import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";
import { CreateUserComponent } from "./users/create-user/create-user.component";
import { SingleUserComponent } from "./users/single-user/single-user.component";
import { TournamentComponent } from "./tournament/tournament.component";

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'users',
        component: UsersComponent,
        title: 'Our Wizards'
    },
    {
        path: 'create-user',
        component: CreateUserComponent,
        title: 'New Wizard incoming',
        data: {
            editMode: false
        },
    },
    {
        path: 'users/:id',
        component: SingleUserComponent,
        title: 'Loading...'
    },
    {
        path: 'users/:id/edit',
        component: CreateUserComponent,
        title: 'Edit',
        data: {
            editMode: true
        }
    },
    {
        path: 'tournament',
        component: TournamentComponent,
        title: 'War Season'
    }
]