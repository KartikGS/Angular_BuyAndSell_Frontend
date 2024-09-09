import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Listing } from '../types';
import { FormsModule} from '@angular/forms';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css'
})
export class ContactPageComponent {

  email: string = '';
  message: string = '';
  listing: Listing = {} as Listing;
constructor(private route: ActivatedRoute, private router: Router, private listingsService: ListingsService) {}

ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id') as string;
  this.listingsService.getListingById(id).subscribe(listing=>{
    this.listing=listing
    this.message = `Hi, I'm interested in your ${this.listing.name.toLowerCase()} listing`;
  })
}
  sendMessage(): void {
    alert('Your message has been sent!');
    this.router.navigateByUrl('/listings');
  }
}