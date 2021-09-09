import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult} from '@azure/msal-browser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logOut(){return this.msalService.logout() }
  constructor(private msalService: MsalService) {}

  isLoggedIn(): boolean{
    return this.msalService.instance.getActiveAccount() !=null;
  }

  login(){
    this.msalService.loginPopup().subscribe((response: AuthenticationResult)=> {
      this.msalService.instance.setActiveAccount(response.account);
    })
  }
}
