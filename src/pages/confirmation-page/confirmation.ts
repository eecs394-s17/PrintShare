import { Component } from '@angular/core';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import request from 'request';
import { Platform, ViewController } from 'ionic-angular';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import { OrdersPage } from '../orders/orders';

@Component({
    templateUrl: 'confirmation.html'
})
export class Confirmation {
    public address: any;
    public time: any;
    public type: any;
    constructor(public platform: Platform, public viewCtrl: ViewController, public navCtrl: NavController, public params: NavParams, public alertCtrl: AlertController) {

        this.address = params.get("address");
        this.time =tConvert(params.get("time"));
        // this.type =params.get("type");
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
    ionViewDidLoad(){
        // this.fetchDocs(this);
    }

    FinalConfirm(){

        let confirm = this.alertCtrl.create({
          title: 'Are you sure?',
          message: 'The document will be sent for printing when you confirm',
          buttons: [
            {
              text: 'Sure!',
              handler: () => {
                let today = new Date();
                let day = today.getDate();
                let month = today.getMonth();
                let year = today.getFullYear();
                var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

                this.navCtrl.push(OrdersPage, {
                    title: "*Docname* @ "+this.address,
                    note: m_names[month]+" "+day+" "+year,
                });
                console.log('Agree clicked');
              }
            }
          ]
        });
        confirm.present();
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
