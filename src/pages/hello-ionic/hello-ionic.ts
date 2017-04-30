import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController, ViewController } from 'ionic-angular';
import { FilePicker } from '../file-picker/file-picker';
import { Confirmation } from '../confirmation-page/confirmation';
// import { ModalContentPage } from './modal-content-page';
import request from 'request';
import * as moment from 'moment';


declare var google;
declare var gapi;
// declare var printerLocs;


@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
    @ViewChild('map') mapElement: ElementRef;
    map: any;
    address: any;
    addressString:any;
    isSearchMarkerSet: boolean;
    allMarkers: any;
    displayDate: any;
    isoDate: any;
    price: any;
    simplex: boolean;
    color: boolean;
    public isPrintingEnabled: boolean;
    filePicker = FilePicker;

    constructor(public navCtrl: NavController, public modalCtrl: ModalController, public viewCtrl: ViewController) {
      this.simplex = true;
      this.color = false;
      this.price = this.calcPrice(this.simplex, this.color);
      this.isPrintingEnabled = true;
      this.displayDate = moment().format("h:mma");
      this.isoDate = moment().format(); // needed for setting default time
    }

    ionViewDidLoad(){
        this.initMap();
        this.initRequestControls();
    }

    addMarker(location, map, iconType=0) {
    /** Add the marker at the clicked location, and add the next-available label
        from the array of alphabetical characters.*/
      //iconType:
      //   0: user
      //   1: printer
      var icon;
      switch(iconType){
        case 0: icon = 'location-icon.png';
                break;
        case 1: icon = 'tiny-printer.png';
                break;
        case 2: icon = 'location-icon.png';
                break;
      }
      let iconURL = `assets/icon/${icon}`;

      let marker = new google.maps.Marker({
        position: location,
        map: this.map,
        icon: iconURL,

      });
      if(iconType == 2){
        if(this.isSearchMarkerSet){
          //Remove the existing search marker when you type in a new one
          this.allMarkers.pop().setMap(null);
          this.allMarkers.push(marker);
        }
        else{
          this.allMarkers.push(marker);
          this.isSearchMarkerSet = true
        }
      }
     marker.setMap(this.map);
    }

    handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
    }

    geoLocalize(latLng, infoWindow, geocoder){
      //avoid directing *this* pointer to navigator.geolocation
      var page_class = this
      return navigator.geolocation.getCurrentPosition(function(position) {
        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
        page_class.address = [position.coords.latitude, position.coords.longitude];
        // Geocoding coordinates to get the string version of the street address
        geocoder.geocode({'location': pos}, function(results, status) {
          if (status === 'OK') {
            if (results[1]) {
              page_class.addressString = results[1].formatted_address;
            } else {
              console.log('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
        page_class.map.setCenter(pos);
        page_class.addMarker(pos, page_class.map,0)
        // return true
        // setTimeout(page_class.geoLocalize, 5000);
      },function() {
          page_class.handleLocationError(true, infoWindow, page_class.map.getCenter());
          let pos = new google.maps.LatLng(42.052936, -87.679330);
          page_class.addMarker(pos, page_class.map,0)
          // return false
        });
    }

    initMap(){
        this.allMarkers = [];
        this.isSearchMarkerSet = false;
        let latLng = new google.maps.LatLng(42.052936, -87.679330);
        this.addressString = "Your Address";
        let infoWindow = new google.maps.InfoWindow({map:this.map})
        let geocoder = new google.maps.Geocoder;
        let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            //mapTypeControl: false,
            //fullscreenControl: false
            disableDefaultUI: true
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        //var uploadDiv = document.createElement('div');
        //this.createUploadButton(uploadDiv, this.map);
        //this.map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(uploadDiv);

        if (navigator.geolocation) {
          // geoLocalize will center the map, set the current location marker
        this.geoLocalize(latLng,infoWindow,geocoder)
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
          this.addMarker(pos, this.map, 1)
        });
    }

    getPrinterLocations(that){
        request('https://purple-print-share.herokuapp.com/printers/active',
            function(error, response, body) {
                // printerLocs=JSON.parse(body);
                that.placePrinters(JSON.parse(body), that.map);
            });
    }

    initRequestControls(){
      // disable ripple
      var disabledButtons = document.getElementsByClassName("disable-ripple");
      for (var i = 0; i < disabledButtons.length; i++) {
        var buttonEffect = <HTMLElement>disabledButtons[i].getElementsByClassName("button-effect")[0];
        buttonEffect.style.display = "none";

        var button = <HTMLElement>disabledButtons[i];
        button.onclick = function() {
          this.classList.remove("activated");
        }
        button.addEventListener("mousedown", function(){
          this.classList.remove("activated");
          this.innerHTML = "look";
        });


      }
      }

    onInput(event, searchVal){
      console.log("Address searched: "+searchVal);
      var geocoder = new google.maps.Geocoder();
      // this.addressString =
      let page_class = this;
      geocoder.geocode({'address': searchVal}, function(results, status) {
        if (status === 'OK') {
          page_class.addMarker(results[0].geometry.location, this.map, 2);
        } else {
          window.alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }

    changeDate(isoDate) {
      var time = isoDate;
      time = time.substr(11,5);
      time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

      if (time.length > 1) { // If time format correct
        time = time.slice (1);  // Remove full string match value
        time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
      }
      time = time.join (''); // return adjusted time or original string
      this.displayDate = time;

    }

    continue() {
        this.navCtrl.push(Confirmation, {
            address: this.addressString,
            time: this.displayDate,
        });
    }

    calcPrice(simplex, color){
      var p = 1.22
      if(simplex){
        p = p + .50
      }
      if(color){
        p = p + 1
      }
      var dist = .2
      p = p + 15 * this.getDistance()
      return p
    }

    getDistance()
    {
      // var min = 0;
      // for(var i=0; i<printerLocs.length; i++)
      //   var doc=printerLocs;
      //   var lat = doc [0]
      //   var lon = doc[1]
      //   var xdist = loc[0]- lat;
      //   var ydist = loc[1]- lon;
      return .2
    }
}
