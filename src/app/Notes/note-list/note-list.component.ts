import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { FormBuilder } from '@angular/forms';
import { UserModel } from '../../Models/userModel';
import { Router } from '@angular/router';
import { NoteModel } from '../../Models/noteModel';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent implements OnInit, OnDestroy {
  constructor(
    private httpClient: HttpClient,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  //
  ngOnInit(): void {
    console.log('NOTE LIST COMPONENT ONINIT RUNNING');
    this.splitJwtPayload();
    if (this.currentDate > this.jwtExpiryDate) {
      this.apiService.sessionTimeOut();
    }
    let localStorageLoginState = localStorage.getItem(
      'this.apiService.isLoggedIn'
    );
    console.log('LOCAL STORAGE LOGIN STATE IS: ' + localStorageLoginState);
  }
  //
  ngOnDestroy(): void {
    console.log('NOTE LIST COMPONENT ONDESTROY RUNNING');
  }
  noteModel: NoteModel = {
    id: 0,
    username: '',
    note: '',
    dateCreated: '',
  };
  noteList: NoteModel[] = [];
  userList: any;
  noteListJSON: any;
  tokenReceivedFromApi: any;
  usernameReceivedFromApi: any;
  expiryTimeReceivedFromApi: any;
  jwtExpiryDate: any;
  currentDate: Date = new Date();

  splitJwtPayload() {
    let token: string = this.getTokenAndStringify();
    let tokenPayload = this.apiService.parseJwt(token);

    console.log('TOKEN PAYLOAD IS: ' + JSON.stringify(tokenPayload));
    this.usernameReceivedFromApi = tokenPayload.username;
    console.log('TOKEN PAYLOAD USERNAME IS: ' + this.usernameReceivedFromApi);
    this.expiryTimeReceivedFromApi = tokenPayload.exp;
    console.log(
      'TOKEN PAYLOAD EXPIRY TIME IS: ' + this.expiryTimeReceivedFromApi
    );
    this.jwtExpiryDate = this.jwtExpiryUnixToDate();
  }
  getTokenAndStringify() {
    //STRINGIFY TOKEN VALUE
    var tokenSentToApiString = JSON.stringify(this.apiService.getToken());
    console.log('TOKEN STRING IS: ' + tokenSentToApiString);
    return tokenSentToApiString;
  }
  dateNow() {
    return setInterval(() => {
      this.currentDate = new Date();
    }, 1);
  }
  jwtExpiryUnixToDate() {
    let date = new Date(this.expiryTimeReceivedFromApi * 1000);
    return date;
  }

  // getAllUsers() {
  //   console.log('GET ALL USERS IS RUNNING FROM NOTE LIST COMPONENT');
  //   this.apiService.getAllUsers().subscribe((data) => {
  //     this.userList = data;
  //     console.log(data);
  //   });
  // }
  getAllNotes() {
    console.log('GET ALL NOTES IS RUNNING FROM NOTE LIST COMPONENT');
    this.apiService
      .getAllNotes(this.usernameReceivedFromApi)
      .subscribe((data) => {
        this.noteListJSON = data;
        console.log(data);
        console.log(this.noteListJSON);

        for (let i = 0; i < this.noteListJSON.length; i++) {
          let note: NoteModel = {
            id: 0,
            username: '',
            note: '',
            dateCreated: '',
          };

          note.id = this.noteListJSON[i].id;
          note.username = this.noteListJSON[i].username;
          note.note = this.noteListJSON[i].note;
          note.dateCreated = this.noteListJSON[i].date_created;
          console.log('NOTE LIST ITEM IS: ');
          console.log(note);
          this.noteList.push(note);
          console.log('NOTE LIST IS: ');
          console.log(this.noteList);
        }
      });
  }
  getNote() {
    console.log('GET NOTE IS RUNNING FROM NOTE LIST COMPONENT');
    this.apiService.getNote('second', '2').subscribe((data) => {
      this.noteListJSON = data;
      console.log(data);
    });
  }
  newNote() {
    this.router.navigate(['new-note']);
  }

  logout() {
    this.apiService.logout();
  }
  test() {
    alert('Test button clicked!');
  }
  //
  //
  //
  //
  //
  //
  //

  getUser() {
    this.apiService.getUser().subscribe((data) => {
      this.userList = data;
      console.log(data);
    });
  }

  createUser() {
    this.apiService.createUser().subscribe((data) => {
      this.userList = data;
      console.log(data);
    });
  }

  updateUser() {
    this.apiService.updateUser().subscribe((data) => {
      this.userList = data;
      console.log(data);
    });
  }
  deleteUser() {
    this.apiService.deleteUser().subscribe((data) => {
      console.log(data);
    });
  }
}
