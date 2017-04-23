import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { FilePicker } from '../file-picker/file-picker';
import { Confirmation } from '../confirmation-page/confirmation';
// import { ModalContentPage } from './modal-content-page';
import request from 'request';
import * as moment from 'moment';


declare var google;
declare var gapi;

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
    @ViewChild('map') mapElement: ElementRef;
    map: any;
    address: any;
    myDate: any;
    public isPrintingEnabled: boolean;
    filePicker = FilePicker;

    constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
      this.isPrintingEnabled = true;
      this.myDate = moment().format("h:mma");
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

      let icon = iconType === 1 ? 'tiny-printer.png' : 'location-icon.png';
      let iconURL = `assets/icon/${icon}`;

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
      return navigator.geolocation.getCurrentPosition(function(position) {
        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
        page_class.map.setCenter(pos);
        let marker = page_class.addMarker(pos, page_class.map,0)
        marker.setMap(page_class.map);
        // return true
        // setTimeout(page_class.geoLocalize, 5000);
      },function() {
          page_class.handleLocationError(true, infoWindow, page_class.map.getCenter());
          let pos = new google.maps.LatLng(42.052936, -87.679330);
          let marker = page_class.addMarker(pos, page_class.map,0)
          marker.setMap(page_class.map);
          // return false
        });
    }

    initMap(){
        let latLng = new google.maps.LatLng(42.052936, -87.679330);
        let infoWindow = new google.maps.InfoWindow({map:this.map})
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
        request('https://purple-print-share.herokuapp.com/printers/active',
            function(error, response, body) {
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

    onInput(searchVal){
      console.log(searchVal)
    }

    changeDate() {
      var time = this.myDate;
      time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

      if (time.length > 1) { // If time format correct
        time = time.slice (1);  // Remove full string match value
        time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
      }
      this.myDate = time.join ('');

    }

    continue() {
        this.navCtrl.push(Confirmation, {
            address: this.address,
            time: this.myDate,
        });
    }
}
