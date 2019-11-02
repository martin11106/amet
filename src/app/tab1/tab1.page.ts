import { Component } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  users:any
  constructor(       
    public api: RestApiService,
    public loadingController: LoadingController,
    public navCtrl: NavController
) {}




 async indentifyUser(){
 await this.api.getDataLocal("https://jsonplaceholder.typicode.com/todos/1")
    .subscribe(res => {
      this.users=res
      console.log(res);
    }, (err) => {
      console.log(err);
    });
}

}
