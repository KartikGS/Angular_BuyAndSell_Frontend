import { Component } from '@angular/core';
import { ListingDataFormComponent } from "../listing-data-form/listing-data-form.component";
import { Router, ActivatedRoute } from '@angular/router';
import { fakeListings } from '../fake-data';
import { Listing } from '../types';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-edit-listing-page',
  standalone: true,
  imports: [ListingDataFormComponent],
  templateUrl: './edit-listing-page.component.html',
  styleUrl: './edit-listing-page.component.css'
})
export class EditListingPageComponent {

  listing: Listing = {} as Listing;

  constructor( private router: Router, private route: ActivatedRoute, private listingsService: ListingsService){

  } 

  ngOnInit(): void{
    const id: string = this.route.snapshot.paramMap.get('id') || "";
    this.listingsService.getListingById(id).subscribe((listing)=>{
      this.listing = listing;
    })
  }
  
  onSubmit({name, description, price}:Listing): void{
      this.listingsService.editListing(this.listing.id, name, description, price)
      .subscribe(()=>{
        this.router.navigateByUrl('/my-listings')
      })
  }
}
