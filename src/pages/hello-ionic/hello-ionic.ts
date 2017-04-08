import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { FilePicker } from '../file-picker/file-picker';
// import { ModalContentPage } from './modal-content-page';


declare var google;
declare var gapi;

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
    @ViewChild('map') mapElement: ElementRef;
    map: any;
    filePicker = FilePicker;

    constructor(public navCtrl: NavController, public modalCtrl: ModalController) {}

    ionViewDidLoad(){
        this.initMap();
    }

    addMarker(location, map, iconType=0) {
    /** Add the marker at the clicked location, and add the next-available label
        from the array of alphabetical characters.*/
      //iconType:
      //   0: user
      //   1: printer
      let iconURL = 'http://maps.google.com/mapfiles/'
      switch(iconType){
        case 0:  iconURL += 'ms/icons/blue.png';
                 break;
        case 1:  iconURL += 'print_icon.gif';
                 break
      }

      let marker = new google.maps.Marker({
        position: location,
        map: this.map,
        icon: iconURL,

      });
    return marker;
    }

    handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
    }

    geoLocalize(latLng, infoWindow){
      //avoid directing *this* pointer to navigator.geolocation
      var page_class = this
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
        page_class.map.setCenter(pos);
        let marker = page_class.addMarker(pos, page_class.map,0)
        marker.setMap(page_class.map);
      },function() {
          page_class.handleLocationError(true, infoWindow, page_class.map.getCenter());
          let pos = new google.maps.LatLng(42.052936, -87.679330);
          let marker = page_class.addMarker(pos, page_class.map,0)
          marker.setMap(page_class.map);
        });
    }

    initMap(){
        let latLng = new google.maps.LatLng(42.052936, -87.679330);
        let infoWindow = new google.maps.InfoWindow({map:this.map})
        let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            fullscreenControl: false
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        var uploadDiv = document.createElement('div');
        this.map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(uploadDiv);

        if (navigator.geolocation) {
          // geoLocalize will center the map, set the current location marker
          this.geoLocalize(latLng,infoWindow)
          infoWindow.getPosition()
        }
        this.getPrinterLocations(this)
        // var printers = [[42.052000, -87.678000], 
        //                 [42.052000, -87.679370],
        //                 [42.052000, -87.679970],
        //                 [42.052500, -87.679970],
        //                 [42.055645, -87.679224],
        //                 [42.053000, -87.678370],
        //                 [42.050000, -87.676370]]
        
    }

    placePrinters(printers, gm){
        printers.map((printer) => {
          var pLat = printer.location[0]; 
          var pLng = printer.location[1];
          let pos = new google.maps.LatLng(pLat, pLng);
          let marker = this.addMarker(pos, this.map, 1)
          marker.setMap(this.map);
        });
    }

    getPrinterLocations(that){
        fetch('https://purple-print-share.herokuapp.com/printers/active',
            {headers:
                {'Access-Control-Allow-Origin': "*"}
            })
            .then(function(res) {
                return res.json();
            })
            .then(function(json) {
                console.log(that)
              that.placePrinters(json,that.map);
            })
        
    }



}


