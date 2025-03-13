import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageComponent } from './searchScholarships/page.component';
import { HomeComponent } from './home/home.component';
import { EmailVerifiedComponent } from './email-verified/email-verified.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostfeedComponent } from './postfeed/postfeed.component';
import { ScholarshipsComponent } from './learning_center/scholarships/scholarships.component';
import { TaxesComponent } from './learning_center/taxes/taxes.component';
import { CreditComponent } from './learning_center/credit/credit.component';
import { LoansComponent } from './learning_center/loans/loans.component';
import { ScamsComponent } from './learning_center/scams/scams.component';

const routes: Routes = [
  {path: 'emailverification', component: EmailVerifiedComponent},
  {path: 'postfeed', component: PostfeedComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'create-post', component: CreatePostComponent},
  {path: 'home', component: HomeComponent},
  {path: 'Find-Scholarships', component: PageComponent},
  {path: 'Learn-Scholarships',component: ScholarshipsComponent},
  {path: 'Learn-Taxes',component: TaxesComponent},
  {path: 'Learn-Credit',component: CreditComponent},
  {path: 'Learn-Loans',component: LoansComponent},
  {path: 'Learn-Scams',component: ScamsComponent},

  
  { path: '', redirectTo: '/welcome', pathMatch: 'full' }, // Default to intro
  { path: '**', redirectTo: '/welcome' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
