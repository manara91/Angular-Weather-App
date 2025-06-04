import { Component, NgZone, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleApiService, Maps } from '../../../services/google-api.service';
import { CommunicationService } from '../../../services/communication.service';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @ViewChild('search') searchElementRef: any;

  autocompleteInput: string = '';

  constructor(
    private googleApiService: GoogleApiService,
    private ngZone: NgZone,
    private communicationService: CommunicationService
  ) {
    googleApiService.api.then((maps) => {
      this.initAutocomplete(maps);
    });
  }

  initAutocomplete(maps: Maps) {
    let autocomplete = new maps.places.Autocomplete(
      this.searchElementRef.nativeElement
    );
    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        this.onPlaceChange(autocomplete.getPlace());
      });
    });
  }

  onPlaceChange(place: google.maps.places.PlaceResult) {
    this.googleApiService.placeResultData.set(place);
    this.communicationService.cityPhoto.set(
      place.photos![0].getUrl({ maxHeight: 1000, maxWidth: 1000 })
    );
    this.communicationService.cityName.set(
      place!.address_components![0].long_name
    );
    this.communicationService.geometricData.set({
      lat: place!.geometry!.location!.lat(),
      lng: place!.geometry!.location!.lng(),
    });
  }
}
