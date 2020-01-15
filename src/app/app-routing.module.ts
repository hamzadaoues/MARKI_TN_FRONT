import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './layout/home/home.component';
import {InPlayComponent} from './in-play/in-play.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {ErrorNotFoundComponent} from './error-not-found/error-not-found.component';
import {StandingsComponent} from './standings/standings.component';
import {ResultsComponent} from './results/results.component';
import {AuthGuard} from './_helpers/auth.guard';
import {NewPasswordComponent} from './new-password/new-password.component';
import {BetSheetDetailsComponent} from './bet-sheet-details/bet-sheet-details.component';
import {AboutUsComponent} from './about-us/about-us.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {PromotionsComponent} from './promotions/promotions.component';
import {OurServicesComponent} from './layout/our-services/our-services.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {LiveNewsComponent} from './layout/live-news/live-news.component';
import {LiveNewsDetailsComponent} from './live-news-details/live-news-details.component';
import {BetSheetComponent} from './bet-sheet/bet-sheet.component';
import {FixturesComponent} from './fixtures/fixtures.component';


const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
  },

  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'reset-password/:token',
    component: NewPasswordComponent,
  },
  {
    path: 'in-play',
    component: InPlayComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'my-bet-sheets',
    component: BetSheetDetailsComponent
  },
  {
    path: 'contact-us',
    component: ContactUsComponent
  },
  {
    path: 'promotions',
    component: PromotionsComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'results',
    component: ResultsComponent
  },
  {
    path: 'PremierLeague/:competitionId',
    component: StandingsComponent
  },
  {
    path: 'Bundesliga/:competitionId',
    component: StandingsComponent
  },
  {
    path: 'LaLiga-Santander/:competitionId',
    component: StandingsComponent
  },
  {
    path: 'SerieA/:competitionId',
    component: StandingsComponent
  },
  {
    path: 'fixtures',
    component: FixturesComponent
  },
  {
    path: 'bet-sheet',
    component: BetSheetComponent
  },
  {
    path: 'Tunisian-Professional-League/:competitionId',
    component: StandingsComponent
  },
  {
    path: 'Ligue1/:competitionId',
    component: StandingsComponent
  },
  {
    path: 'our-services',
    component: OurServicesComponent
  },
  {
    path: 'live-events',
    component: LiveNewsDetailsComponent
  },
  {
    path: '**',
    component: ErrorNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
