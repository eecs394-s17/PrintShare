import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';


@Component({
  selector: 'page-list',
  templateUrl: 'orders.html'
})
export class OrdersPage {
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.icons = []
    //'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    //'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    var titles = ["HW1.pdf", "Lab Report.doc", "EECS 214 Lecture Slides.ppt", "Earth 201 Notes.pdf", "Practice Test.pdf"]
    var dates = ["Mar 6 2017", "Feb 15 2017", "Jan 31 2017","Dec 1 2016", "Nov 3 2016"]
    if(NavParams){
      titles.push(navParams.get('title'));
      dates.push(navParams.get('note'));
    }
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
