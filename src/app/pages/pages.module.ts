import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';

import { Pages } from './pages.component';
import {AuthGuard} from "../_guard/auth.guard";
import {CoreModule} from "../core/core.module";

@NgModule({
  imports: [CommonModule, NgaModule, routing,CoreModule],
  declarations: [Pages],
  providers:[AuthGuard]
})
export class PagesModule {
}
