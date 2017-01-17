//==================================================================================================
// Module Definition
//==================================================================================================
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

// 3rd Party
import {Ng2PaginationModule} from 'ng2-pagination';

// App-specific
import { AppComponent }  from './app.component';
import { DisplayComponent } from './display.component';
import { RandomComponent } from './random.component';

import { AddressGeneratorService } from './address-generator.service';
//import { AddressListService } from './address-list.service';


//=================================================
// Module Configuration
//=================================================
@NgModule({

  imports: [
    BrowserModule,
    FormsModule,
    Ng2PaginationModule,
  ],

  declarations: [
      AppComponent,
      DisplayComponent,
      RandomComponent,
    ],

  providers: [
    AddressGeneratorService,
//    AddressListService,
  ],

  bootstrap:    [ AppComponent ]
})
export class AppModule { }
