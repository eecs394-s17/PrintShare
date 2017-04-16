import { Component } from '@angular/core';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import request from 'request';

@Component({
    templateUrl: 'file-picker.html'
})
export class FilePicker {
    homePage = HelloIonicPage;
    items =[];
    isColor: string = "BW";
    isDuplex: string = "Simplex";

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
}
