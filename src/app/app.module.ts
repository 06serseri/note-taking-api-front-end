import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersAddComponent } from './Users/users-add/users-add.component';
import { UsersDetailComponent } from './Users/users-detail/users-detail.component';
import { UsersListComponent } from './Users/users-list/users-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NoteListComponent } from './Notes/note-list/note-list.component';
import { LoginComponent } from './login/login.component';
import { NewNoteComponent } from './Notes/new-note/new-note.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersAddComponent,
    UsersDetailComponent,
    UsersListComponent,
    NoteListComponent,
    LoginComponent,
    NewNoteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
