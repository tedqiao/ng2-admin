import {NgModule} from "@angular/core";
import {CommonModule}  from '@angular/common';
import {routing} from "./test.routing";
import {Test} from "./test.component";
import {NgaModule} from "../../theme/nga.module";
import { TripEdit} from "./components/tripEdit/tripEdit.component";
import {TripEditService} from "./components/tripEdit/tripEdit.service";

@NgModule({
  imports: [
    NgaModule,
    CommonModule,
    routing
  ],
  declarations: [
    Test,
    TripEdit
  ],
  providers: [
    TripEditService
  ]

})
export default class TestModule {

}
