import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator-component/calculator-component.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';
import { NavbarComponentComponent } from './navbar-component/navbar-component.component';
import { PopupComponentComponent } from './popup-component/popup-component.component';
import { StaticContentComponent } from './static-content/static-content.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponentComponent,
    FooterComponentComponent,
    CalculatorComponent,
    PopupComponentComponent,
    StaticContentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
