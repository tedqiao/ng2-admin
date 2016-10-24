import {NgModule} from "@angular/core";
import {routing} from "./test.routing";
import {Test} from "./test.component";

@NgModule({
  imports:[
    routing
  ],
  declarations:[
    Test
  ],
  providers:[

  ]

})
export default class TestModule{

}
