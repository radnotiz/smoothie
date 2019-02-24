import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule, MatCardModule, MatProgressBarModule, MatDividerModule, MatListModule, MatInputModule, MatGridListModule } from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';
import { CACHE_SIZE_LIMIT } from './cache.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatDividerModule,
    MatListModule,
    MatInputModule,
    MatGridListModule,
    FlexLayoutModule,
  ],
  providers: [
    { provide: CACHE_SIZE_LIMIT, useValue: 3 }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
