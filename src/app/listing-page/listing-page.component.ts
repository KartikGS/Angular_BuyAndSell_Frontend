import { Component } from '@angular/core';
import { Listing } from '../types';
import { ListingsService } from '../listings.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listing-page',
  standalone: true,
  imports: [NgFor,RouterLink],
  templateUrl: './listing-page.component.html',
  styleUrl: './listing-page.component.css'
})
export class ListingPageComponent {
listings: Listing[] = [];

constructor(
  private listingsService: ListingsService, 
){

}

ngOnInit(): void {
  this.listingsService.getListings().subscribe(listings=>this.listings=listings)
}
}
