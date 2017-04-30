import { Component } from '@angular/core';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import {NavController, NavParams, AlertController, ViewController, Events} from 'ionic-angular';
import request from 'request';

@Component({
    templateUrl: 'file-picker.html'
})
export class FilePicker {
    constructor(public navCtrl: NavController, public params: NavParams, public alertCtrl: AlertController, public viewCtrl: ViewController, public events: Events) {
        this.isColor = params.get("isColor");
        this.isDuplex = params.get("isDuplex");
    }

    homePage = HelloIonicPage;
    items =[];
    isColor: string;
    isDuplex: string;

    ionViewDidLoad(){
        this.fetchDocs(this);
    }
    fetchDocs(that) {
        const config = { headers: {'Access-Control-Allow-Origin': "*"} }

        request('https://purple-print-share.herokuapp.com/docs', config,
            function(error, response, body) {
                that.items = JSON.parse(body);
        });
    }

    selectFile(){
        this.events.publish('doctype:changed', this.isDuplex, this.isColor);
        this.navCtrl.pop();
      }
}
