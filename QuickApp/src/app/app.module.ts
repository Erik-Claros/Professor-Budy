import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageComponent } from './page/page.component';
import { Page2Component } from './page2/page2.component';
import { FormsModule } from '@angular/forms';
import { ChatBotComponent } from './chat-bot/chat-bot.component';
import { ScholarshipLearningComponent } from './scholarship-learning/scholarship-learning.component';
import { LoansLearningComponent } from './loans-learning/loans-learning.component';
import { ScamsLearningComponent } from './scams-learning/scams-learning.component';
import { CreditLearningComponent } from './credit-learning/credit-learning.component';
import { TaxesLearningComponent } from './taxes-learning/taxes-learning.component';
import { HomeComponent } from './home/home.component';
import {initializeApp, getApps} from 'firebase/app';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {getAuth} from 'firebase/auth'
import { environment } from '../environments/environment.development';
import { AuthComponent } from './auth/auth.component';
import { EmailVerifiedComponent } from './email-verified/email-verified.component';
import { ProfileCreatorComponent } from './profile-creator/profile-creator.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostfeedComponent } from './postfeed/postfeed.component';
import { PostComponent } from './post/post.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent,
    PageComponent,
    Page2Component,
    ChatBotComponent,
    ScholarshipLearningComponent,
    LoansLearningComponent,
    ScamsLearningComponent,
    CreditLearningComponent,
    TaxesLearningComponent,
    HomeComponent,
    AuthComponent,
    EmailVerifiedComponent,
    ProfileCreatorComponent,
    CreatePostComponent,
    PostfeedComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){
    if(!getApps().length){
      initializeApp(environment.firebaseConfig);
      
    }
    const auth = getAuth();
    if (auth) {
    }
  }
 }
