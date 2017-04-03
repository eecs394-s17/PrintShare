import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ModalContentPage } from './modal-content-page';


declare var google;

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
    @ViewChild('map') mapElement: ElementRef;
    map: any;

    constructor(public navCtrl: NavController, public modalCtrl: ModalController) {}

    ionViewDidLoad(){
        this.getPrinters();
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

    createUploadButton(controlDiv, map) {
        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.style.width = '100px';
        controlUI.style.position = 'relative';
        controlUI.title = 'Click to upload document';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = '<span class="drive-helper"></span> <img src="assets/img/drive512.png" id="drive-logo"> Upload';
        controlUI.appendChild(controlText);

        controlUI.addEventListener('click', (event) =>{
            let modal = this.modalCtrl.create(ModalContentPage);
            modal.present();
        });
    };

    geoLocalize(latLng, infoWindow){
      //avoid directing *this* pointer to navigator.geolocation
      var page_class = this
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
        page_class.map.setCenter(pos);
        let marker = page_class.addMarker(pos, page_class.map,0)
        marker.setMap(page_class.map);
      },function() {
          this.handleLocationError(true, infoWindow, this.map.getCenter());
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
        this.createUploadButton(uploadDiv, this.map);
        this.map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(uploadDiv);

        if (navigator.geolocation) {
          // geoLocalize will center the map and return the center position
          this.geoLocalize(latLng,infoWindow)
          infoWindow.getPosition()
        }
    }

    getPrinters(){
        fetch('https://purple-print-share.herokuapp.com/printers/active',
            {headers:
                {'Access-Control-Allow-Origin': "*"}
            })
            .then(function(res) {
                return res.json();
            })
            .then(function(json) {
                console.log(json);
            });
    }

}
