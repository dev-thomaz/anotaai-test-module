import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { ItemService } from './services/item.service';
import { itemReducer, getItemFeatureKey } from './store/reducers/item.reducer';
import { ItemEffects } from './store/effects/item.effects';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ItemListComponent,
    ItemCardComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({ [getItemFeatureKey]: itemReducer }), 
    EffectsModule.forRoot([ItemEffects]),                 
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
    }),
  ],
  providers: [ItemService],
  bootstrap: [AppComponent],
})
export class AppModule { }