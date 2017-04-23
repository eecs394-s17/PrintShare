import { Component } from '@angular/core';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import request from 'request';
import { Platform, ViewController } from 'ionic-angular';
import {NavController, NavParams} from 'ionic-angular';

@Component({
    templateUrl: 'confirmation.html'
})
export class Confirmation {
    public address: any;
    public time: any;
    public type: any;
    constructor(public platform: Platform, public viewCtrl: ViewController, public navCtrl: NavController, public params: NavParams) {
        
        this.address =params.get("address");
        this.time =params.get("time");
        // this.type =params.get("type");
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
    ionViewDidLoad(){
        // this.fetchDocs(this);
    }
}
