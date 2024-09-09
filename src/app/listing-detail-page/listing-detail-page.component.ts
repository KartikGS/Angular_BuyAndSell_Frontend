import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Listing } from '../types';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-listing-detail-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './listing-detail-page.component.html',
  styleUrl: './listing-detail-page.component.css'
})
export class ListingDetailPageComponent {

  isLoading: boolean = true;

  listing: Listing = {id: 'Unkown', name: 'Error', description: 'Item not found', price: 0, views: 0};

  constructor(private route: ActivatedRoute, private listingsService: ListingsService,
  ) {

  }

ngOnInit(): void {
  const id:string = this.route.snapshot.paramMap.get('id') as string;
  this.listingsService.getListingById(id).subscribe(listing=>{
    this.listing=listing;
    this.isLoading=false;
  })
  this.listingsService.addViewToListing(id)
  .subscribe(()=>console.log('Views Updated!'));
}

}
