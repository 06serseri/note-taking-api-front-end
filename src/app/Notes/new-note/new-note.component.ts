import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss'],
})
export class NewNoteComponent implements OnInit, OnDestroy {
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {}
  tokenReceivedFromApi: any;
  usernameReceivedFromApi: any;
  expiryTimeReceivedFromApi: any;
  jwtExpiryDate: any;
  currentDate: Date = new Date();

  newNoteForm = this.formBuilder.group({
    note: ['', [Validators.required, Validators.minLength(5)]],
  });

  ngOnInit(): void {
    console.log('NEW NOTE COMPONENT ONINIT RUNNING');
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
    console.log('NEW NOTE COMPONENT ONDESTROY RUNNING');
  }

  get getNote() {
    return this.newNoteForm.get('note');
  }

  createNote() {
    console.log('CREATE NOTE IS RUNNING FROM NEW NOTE COMPONENT');
    console.log(JSON.stringify(this.newNoteForm.value));
    var note = JSON.stringify(this.newNoteForm.value);

    //HARDCODED NOTE INFO BELOW TRYING TO DO HTTP POST REQUEST TO THE API SERVICE
    this.apiService
      .createNote(this.usernameReceivedFromApi, this.newNoteForm.value)
      .subscribe((data) => {});
    this.router.navigate(['note-list']);
  }

  getTokenAndStringify() {
    //STRINGIFY TOKEN VALUE
    var tokenSentToApiString = JSON.stringify(this.apiService.getToken());
    console.log('TOKEN STRING IS: ' + tokenSentToApiString);
    return tokenSentToApiString;
  }
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
  jwtExpiryUnixToDate() {
    let date = new Date(this.expiryTimeReceivedFromApi * 1000);
    return date;
  }
}
