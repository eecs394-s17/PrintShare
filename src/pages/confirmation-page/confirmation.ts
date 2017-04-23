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
        this.time =tConvert(params.get("time"));
        // this.type =params.get("type");
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
    ionViewDidLoad(){
        // this.fetchDocs(this);
    }
    
}
function tConvert (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
        time = time.slice (1);  // Remove full string match value
        time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
}