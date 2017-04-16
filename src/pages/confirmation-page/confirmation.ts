import { Component } from '@angular/core';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import request from 'request';
import { Platform, ViewController } from 'ionic-angular';

@Component({
    templateUrl: 'confirmation.html'
})
export class Confirmation {
    constructor(public platform: Platform, public viewCtrl: ViewController) {}
    homePage = HelloIonicPage;
    items =[];

    dismiss() {
        this.viewCtrl.dismiss();
    }
    ionViewDidLoad(){
        // this.fetchDocs(this);
    }
}
