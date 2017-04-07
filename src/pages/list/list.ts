import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.icons = ['wifi'] 
    //'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    //'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    var titles = ["HW1.pdf- Dec 1", "Orders", "Payment", "Help", "Sign up to Print"]
    var dates = ["March 6 2017", "Feb 15 2017", "Jan 31 2017","Dec 1 2016", "Nov 3 2016"]
    for(let i = 0; i < titles.length; i++) {
      this.items.push({
        title: titles[i],
        note: dates[i],
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}
