import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutHeaderComponent } from './components/layout-header/layout-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { SearchComponent } from './components/search/search.component';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { FilterByStringPipe } from './shared/pipes/filter-by-string.pipe';
import { BackdropComponent } from './components/backdrop/backdrop.component';
import { CatalogPopupComponent } from './components/catalog-popup/catalog-popup.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FilterByCategoryPipe } from './shared/pipes/filter-by-category.pipe';

@NgModule({
  schemas: [NO_ERRORS_SCHEMA],
  declarations: [
    AppComponent,
    LayoutHeaderComponent,
    SearchComponent,
    SearchProductComponent,
    FilterByStringPipe,
    BackdropComponent,
    CatalogPopupComponent,
    FilterByCategoryPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatInputModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
