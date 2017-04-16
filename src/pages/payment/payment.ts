import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';


@Component({
  selector: 'page-list',
  templateUrl: 'payment.html'
})
export class PaymentPage {
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.icons = [''] 
    //'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    //'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    var titles = ["Visa-   *0000", "PayPal"]
    var dates = ["", "",""]
    for(let i = 0; i < titles.length; i++) {
      this.items.push({
        title: titles[i],
        note: dates[i],
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
  }
}
