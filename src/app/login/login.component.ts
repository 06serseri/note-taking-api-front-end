import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../Services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '../Models/userModel';
import { forbiddenWordValidator } from '../Shared/username.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  /**
   *
   */
  constructor(
    private httpClient: HttpClient,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    console.log('LOGIN COMPONENT ONDESTROY RUNNING');
    console.log('IS LOGGED IN = ' + this.apiService.isLoggedIn);
    let localStorageLoginState = localStorage.getItem(
      'this.apiService.isLoggedIn'
    );
    console.log('LOCAL STORAGE LOGIN STATE IS: ' + localStorageLoginState);
  }
  ngOnInit(): void {
    console.log('LOGIN COMPONENT ONINIT RUNNING');
    console.log('IS LOGGED IN = ' + this.apiService.isLoggedIn);
    let localStorageLoginState = localStorage.getItem(
      'this.apiService.isLoggedIn'
    );
    console.log('LOCAL STORAGE LOGIN STATE IS: ' + localStorageLoginState);
    //IF LOCAL STORAGE STATE IS TRUE THEN GO TO NOTE LIST PAGE?
    //OR WHAT IF TRYING TO CLICK BACK BUTTON FROM ANY PAGE HOW DO YOU JUST REFRESH
    //GITHUB EXAMPLE VS AWS EXAMPLE MAYBE ITS NOT A HUGE DEAL PER AWS
  }

  userList: any;
  tokenReceivedFromApi: any;
  errorMessage: string = '';
  loginUnsuccessful: boolean = false;

  userModel: UserModel = {
    id: '',
    username: 'A',
    password: 'B',
  };

  loginForm = this.formBuilder.group({
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        forbiddenWordValidator(/admin/),
      ],
    ],
    password: [''],
  });
  get getUsername() {
    return this.loginForm.get('username');
  }

  //CALL API FROM SERVICE

  //-------------------------------------------------------------------------------------------------
  //
  //GET THE USERNAME AND PASSWORD FROM THE USER AND VALIDATE PER ALEX TUTORIAL
  //LOGIN BY COMPARING THE PW THAT USER PROVIDED TO DB PASSWORD FOR THAT USER IF IT EXISTS
  //ROUTE TO THE AUTHENTICATED USER PAGE THAT CAN PERFORM CRUD OPERATIONS
  //PUT A LOGOUT BUTTON AND FUNCTION THAT WILL REMOVE THE AUTHORIZATION
  //CLICK LOGIN ISSUE JWT
  //GET ALL THE USERS
  //FIND THE USERNAME IF NOT THROW ERROR
  //COMPARE TO THE USER PROVIDED PASSWORD
  //
  //
  // username: "test"
  // password: "test"
  //API SERVICE METHODS BELOW
  loginApi() {
    console.log('LOGIN API IS RUNNING FROM LOGIN COMPONENT');
    //console.log('LOGIN FORM FIELD USERNAME IS: ' + this.loginForm.value.username);
    //
    this.apiService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe({
        next: (data) => {
          this.tokenReceivedFromApi = data;
          //CONSOLE LOG HTTP RESPONSE OBJECT
          console.log('TOKEN RECEIVED FROM API IS:');
          console.log(this.tokenReceivedFromApi);
          //STORE JWT IN LOCAL STORAGE
          localStorage.setItem(
            'localStorageSuperSecretKey',
            JSON.stringify(this.tokenReceivedFromApi)
          );
          //VERIFY SUCCESFUL LOGIN ASK THIS TO ALEX
          if (this.tokenReceivedFromApi != undefined) {
            //LOGIN SUCCESFULL NAVIGATE TO THE NOTE LIST PAGE
            this.apiService.isLoggedIn = true;
            localStorage.setItem('this.apiService.isLoggedIn', 'true');
            this.router.navigate(['note-list']);
            this.loginUnsuccessful = false;
          }
          //PARSE JWT FROM NOTE LIST COMPONENT
          //SHOW WELCOME {{USERNAME}}
          //LOGOUT METHOD THAT REMOVES JWT
          //WHICH LIBRARY TO USE IN ANGULAR FOR JWT PARSING?
          //LOGOUT AUTOMATICALLY WHEN THE JWT EXPIRES
          //MAKE SURE THE SESSION IS DEFINED BY PARSIN JWT
        },
        error: (err) => {
          console.log(err);
          //SHOW RELEVANT ERROR MESSAGE
          console.log('LOGIN ERROR');
          //CONSOLE LOG JWT VALUE
          console.log('TOKEN RECEIVED FROM API IS:');
          console.log(this.tokenReceivedFromApi);
          // this.errorMessage = JSON.stringify(err.error.errorMessage);
          this.errorMessage = JSON.parse(
            JSON.stringify(err.error.errorMessage)
          );
          console.log('ERROR MESSAGE IS: ' + this.errorMessage);
          this.apiService.isLoggedIn = false;
          localStorage.setItem('this.apiService.isLoggedIn', 'false');
          this.loginUnsuccessful = true;
        },
      });
    this.loginForm.reset();
    //PREVIOUS SUBSCRIBE METHOD
    // this.apiService
    //   .login(this.loginForm.value.username, this.loginForm.value.password)
    //   .subscribe(
    //     (data) => {
    //       this.tokenReceivedFromApi = data;
    //       //https://stackoverflow.com/questions/55472124/subscribe-is-deprecated-use-an-observer-instead-of-an-error-callback

    //       //CONSOLE LOG HTTP RESPONSE OBJECT
    //       console.log('TOKEN RECEIVED FROM API IS:');
    //       console.log(this.tokenReceivedFromApi);

    //       //STORE JWT IN LOCAL STORAGE
    //       localStorage.setItem(
    //         'localStorageSuperSecretKey',
    //         JSON.stringify(this.tokenReceivedFromApi)
    //       );

    //       //VERIFY SUCCESFUL LOGIN ASK THIS TO ALEX
    //       if (this.tokenReceivedFromApi != undefined) {
    //         //LOGIN SUCCESFULL NAVIGATE TO THE NOTE LIST PAGE
    //         this.router.navigate(['note-list']);
    //         this.loginUnsuccessful = false;
    //       }
    //     }
    //     ,
    //     (err) => {
    //       console.log(JSON.stringify(err.error));
    //       //SHOW RELEVANT ERROR MESSAGE
    //       console.log('LOGIN ERROR');
    //       //CONSOLE LOG JWT VALUE
    //       console.log('TOKEN RECEIVED FROM API IS:');
    //       console.log(this.tokenReceivedFromApi);
    //       this.errorMessage = JSON.stringify(err.value);
    //       this.loginUnsuccessful = true;
    //     }
    //   );
  }

  getToken() {
    var tokenSentToApi = JSON.parse(
      localStorage.getItem('localStorageSuperSecretKey')!
    );
    console.log('TOKEN IS: ' + tokenSentToApi.token);
    return tokenSentToApi;
  }
}
