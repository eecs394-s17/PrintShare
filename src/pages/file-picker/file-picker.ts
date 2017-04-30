import { Component } from '@angular/core';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import {NavController, NavParams, AlertController, ViewController} from 'ionic-angular';
import request from 'request';

@Component({
    templateUrl: 'file-picker.html'
})
export class FilePicker {
    constructor(public navCtrl: NavController, public params: NavParams, public alertCtrl: AlertController, public viewCtrl: ViewController) {
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
        this.navCtrl.push(HelloIonicPage, {
            isColor: this.isColor,
            isDuplex: this.isDuplex,
        }).then(() => {
        // first we find the index of the current view controller:
        const index = this.viewCtrl.index;
        // then we remove it from the navigation stack
        this.navCtrl.remove(index);
        this.navCtrl.remove(index);
      });
    }
}
