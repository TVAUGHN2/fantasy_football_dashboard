import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
  message: string;
  loginTxt: string;
  forgotTxt: string;
  isCreatingProfile: boolean = false;

  @Input() loginOverlayHidden: boolean;

  model: {} = {username: "", password: ""};

  constructor(public authService: AuthService) {
    this.message = '';
    this.loginTxt = "Login";
    this.forgotTxt = "Forgot Password";
  }

  login(): boolean {
    this.message = '';
    if (!this.authService.login(this.model["username"], this.model["password"])) {
      this.message = 'Incorrect credentials.';
      setTimeout(function() {
        this.message = '';
      }.bind(this), 2500);
    }

    this.changeOverlay();
    location.reload(); //refresh browser (refreshes nav bar name)
    return false;
  }

  logout(): boolean {
    this.authService.logout();
    
    location.reload(); //refresh browser (refreshes nav bar name)

    console.log("before overlay value: " + this.loginOverlayHidden);
    this.changeOverlay();
    console.log("after overlay value: " + this.loginOverlayHidden);
    return false;
  }

  exit(){
    this.changeOverlay();
  }



  changeOverlay() {
    this.loginOverlayHidden = !this.loginOverlayHidden;
    
  }

  onCancel(type: string) { 
    if(type == "login"){
      //code to go back to dashboard
      this.changeOverlay();

    }
    else if (type =="cancel"){
      this.isCreatingProfile = false;
    }

    this.clear();
  }

  clear(){
    this.model["username"] = "";
    this.model["password"] = "";
  }

  createProfile(){
    this.isCreatingProfile = true;
  }

  ngOnInit(){

  }
}
