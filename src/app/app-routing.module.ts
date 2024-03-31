import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NoteListComponent } from './Notes/note-list/note-list.component';
import { LoginComponent } from './login/login.component';
import { CanActivate } from './auth-guard';
import { NewNoteComponent } from './Notes/new-note/new-note.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'note-list',
    component: NoteListComponent,
    canActivate: [CanActivate],
  },
  {
    path: 'new-note',
    component: NewNoteComponent,
    canActivate: [CanActivate],
  },
  {
    path: '**',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
