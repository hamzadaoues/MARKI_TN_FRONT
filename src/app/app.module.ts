import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ScrollToTopComponent } from './layout/scroll-to-top/scroll-to-top.component';
import {CustomCursorComponent} from './layout/custom-cursor/custom-cursor.component';
import { BannerComponent } from './layout/banner/banner.component';
import { PreloaderComponent } from './layout/preloader/preloader.component';
import { FeaturesBoxComponent } from './layout/features-box/features-box.component';
import { GamesComponent } from './layout/games/games.component';
import { DownloadAppSectionComponent } from './layout/download-app-section/download-app-section.component';
import { StepsToPlayComponent } from './layout/steps-to-play/steps-to-play.component';
import { OurServicesComponent } from './layout/our-services/our-services.component';
import { TestimonialComponent } from './layout/testimonial/testimonial.component';
import { LiveNewsComponent } from './layout/live-news/live-news.component';
import { HomeComponent } from './layout/home/home.component';
import { ErrorNotFoundComponent } from './error-not-found/error-not-found.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { LiveNewsDetailsComponent } from './live-news-details/live-news-details.component';
import { ResultsComponent } from './results/results.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { InPlayComponent } from './in-play/in-play.component';
import { HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ScrollToTopComponent,
    CustomCursorComponent,
    BannerComponent,
    PreloaderComponent,
    FeaturesBoxComponent,
    GamesComponent,
    DownloadAppSectionComponent,
    StepsToPlayComponent,
    OurServicesComponent,
    TestimonialComponent,
    LiveNewsComponent,
    HomeComponent,
    ErrorNotFoundComponent,
    ContactUsComponent,
    LoginComponent,
    RegistrationComponent,
    StatisticsComponent,
    PromotionsComponent,
    LiveNewsDetailsComponent,
    ResultsComponent,
    AboutUsComponent,
    InPlayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
