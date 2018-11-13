import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule } from '@angular/material';
import { MaterialModule } from './material.module';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { GlobalvarsService } from './globalvars.service';
import { HttpModule } from '@angular/http';
import { UpdateComponent } from './update/update.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    UpdateComponent
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,MaterialModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    AppRoutingModule,
    MatCardModule,HttpModule,
  ],
  providers: [GlobalvarsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
