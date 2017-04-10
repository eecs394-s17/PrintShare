import { Component } from '@angular/core';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';

@Component({
    templateUrl: 'file-picker.html'
})
export class FilePicker {
    homePage = HelloIonicPage;
    items =[];

    ionViewDidLoad(){
        this.fetchDocs(this);
    }
    fetchDocs(that) {
        const config = { headers: {'Access-Control-Allow-Origin': "*"} }

        return fetch('https://purple-print-share.herokuapp.com/docs', config)
            .then(res => res.json())
            .then(docs =>{
              that.items = docs;
            })
    }
}
