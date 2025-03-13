import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageComponent } from './searchScholarships/page.component';
import { FormsModule } from '@angular/forms';
import { ChatBotComponent } from './chat-bot/chat-bot.component';
import { HomeComponent } from './home/home.component';
import {initializeApp, getApps} from 'firebase/app';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {getAuth} from 'firebase/auth'
import { environment } from '../environments/environment.development';

import { EmailVerifiedComponent } from './email-verified/email-verified.component';
import { ProfileCreatorComponent } from './profile-creator/profile-creator.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostfeedComponent } from './postfeed/postfeed.component';
import { PostComponent } from './post/post.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { ScholarshipsComponent } from './learning_center/scholarships/scholarships.component';
import { LoansComponent } from './learning_center/loans/loans.component';
import { CreditComponent } from './learning_center/credit/credit.component';
import { TaxesComponent } from './learning_center/taxes/taxes.component';
import { ScamsComponent } from './learning_center/scams/scams.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent,
    PageComponent,
    ChatBotComponent,
    HomeComponent,
    EmailVerifiedComponent,
    ProfileCreatorComponent,
    CreatePostComponent,
    PostfeedComponent,
    PostComponent,
    ScholarshipsComponent,
    LoansComponent,
    CreditComponent,
    TaxesComponent,
    ScamsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    HttpClientModule,
    QuillModule.forRoot(),
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
