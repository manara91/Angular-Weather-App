import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommunicationService } from './services/communication.service';
import { GoogleApiService } from './services/google-api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'HimmelsBlick';

  constructor(
    private communicationService: CommunicationService,
    private googleApiService: GoogleApiService
  ) {}

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.communicationService.geometricData.set({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }

    this.googleApiService.api.then((maps) => {
      var geocoder = new maps.Geocoder();

      setTimeout(() => {
        var latlng = new google.maps.LatLng(
          this.communicationService.geometricData()!.lat,
          this.communicationService.geometricData()!.lng
        );
        geocoder.geocode({ location: latlng }, (results, status) => {
          if (!results) return;
          const cityName = results![0].address_components[3].long_name;
          this.communicationService.cityName.set(
            results![0].address_components[3].long_name
          );

          var mapElement = document.getElementById('map') as HTMLDivElement;
          var service = new maps.places.PlacesService(mapElement);

          service.findPlaceFromQuery(
            { query: cityName, fields: ['photos'] },
            (result) => {
              this.communicationService.cityPhoto.set(
                result[0].photos![0].getUrl({
                  maxHeight: 1000,
                  maxWidth: 1000,
                })
              );
            }
          );
        });
      }, 500);
    });
  }
}
