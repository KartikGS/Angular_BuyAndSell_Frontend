import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListingPageComponent } from './listing-page/listing-page.component';
import { NavbarComponent } from "./navbar/navbar.component";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListingPageComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'buy-and-sell';
  app = initializeApp(environment.firebaseConfig)
  provider = new GoogleAuthProvider();
  auth = getAuth(this.app);

  signInClicked():void {
    signInWithPopup(this.auth, this.provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result) || {accessToken:""};
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
      });
  }

  signOutClicked(): void{
    this.auth.signOut();
  }
}
