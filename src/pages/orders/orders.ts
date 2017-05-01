import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';

import request from 'request';


@Component({
  selector: 'page-list',
  templateUrl: 'orders.html'
})
export class OrdersPage {
    items = [];

    constructor(public navCtrl: NavController, public navParams: NavParams) {}

    ionViewDidLoad() {
        this.fetchDocs(this);
    }

    fetchDocs(that) {
        const config = { headers: {'Access-Control-Allow-Origin': "*"} }

        request('https://purple-print-share.herokuapp.com/docs', config,
            function(error, response, body) {
                const docs = JSON.parse(body);
                that.items = docs.filter(function(doc) {
                    return doc.printed;
                });
            });
    }
}
