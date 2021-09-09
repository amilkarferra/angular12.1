import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { EventMessage, EventType } from '@azure/msal-browser';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'POC for msal-angular';
  isIframe = false;
  loginDisplay = false;

  constructor(private authService: MsalService, private msalBroadcastService: MsalBroadcastService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;

    this.msalBroadcastService.msalSubject$.pipe(
      filter((event)=> event.eventType === EventType.LOGIN_SUCCESS || event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS )
    )
    .subscribe((event:EventMessage)=>{
        this.setLoginDisplay();
        console.log(event)
    })

    this.msalBroadcastService.msalSubject$.pipe(
      filter((event)=> event.eventType === EventType.LOGOUT_SUCCESS )
    )
    .subscribe((event:EventMessage)=>{
      console.log("logout success");
        this.router.navigateByUrl("/");
    })
  }

  login() {
    //************* */
    //USING A POPUP */
    //************* */
    // this.authService.loginPopup()
    //   .subscribe({
    //     next: (result) => {
    //       console.log(result);
    //       this.setLoginDisplay();
    //     },
    //     error: (error) => console.log(error)
    //   });

    this.authService.loginRedirect(); //redirecting 
  }

  logOut(){
    this.authService.logout();
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }
}