import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ListingDataFormComponent } from "../listing-data-form/listing-data-form.component";
import { ListingsService } from '../listings.service';
import { Listing } from '../types';

@Component({
  selector: 'app-new-listing-page',
  standalone: true,
  imports: [FormsModule, ListingDataFormComponent],
  templateUrl: './new-listing-page.component.html',
  styleUrl: './new-listing-page.component.css'
})
export class NewListingPageComponent {

  constructor(private router: Router, private listingsService: ListingsService) {}

  onSubmit({name, description, price}:Listing): void {
    this.listingsService.createListing(name, description, price)
    .subscribe(()=>{
      this.router.navigateByUrl('/my-listings');
    })
  }
}
