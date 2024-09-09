import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Listing } from './types';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { environment } from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

const httpOptionsWithAuthToken = (token:string) => ({
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'AuthToken': token,
  })
});

@Injectable({
  providedIn: 'root'
})
export class ListingsService {

  app = initializeApp(environment.firebaseConfig)
  auth = getAuth(this.app)

  constructor(
    private http: HttpClient,
  ) { }

  getListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>('/api/listings');
  }

  getListingById(id: string): Observable<Listing> {
    return this.http.get<Listing>(`/api/listings/${id}`);
  } 

  addViewToListing(id: string): Observable<Listing> {
    return this.http.post<Listing>(
      `/api/listings/${id}/add-view`,
      {},
      httpOptions,
    );
  }

  getListingsForUser():Observable<Listing[]>{
    return new Observable<Listing[]>(observer => {
      this.auth.currentUser?.getIdToken().then(token=>{
        if(token){ 
          this.http.get<Listing[]>(`/api/users/${this.auth.currentUser?.uid}/listings`,httpOptionsWithAuthToken(token))
          .subscribe((listings)=>{
            observer.next(listings);
          });
        }else{
          observer.next([]);
        }
      })
    })
  }

  deleteListing(id:string):Observable<any>{
    return new Observable<any>(observer=>{
      this.auth.currentUser?.getIdToken().then((token)=>{
        this.http.delete<any>(`/api/listings/${id}`, httpOptionsWithAuthToken(token))
        .subscribe(()=>observer.next());
      })
    })
  }

  createListing(name:string, description:string, price:number):Observable<Listing>{
    return new Observable<Listing>(observer=>{
      this.auth.currentUser?.getIdToken().then(token=>{
        this.http.post<Listing>(
          `/api/listings`,
          {name, description, price},
          httpOptionsWithAuthToken(token),
        ).subscribe(()=>observer.next());
      })
    })
  }

  editListing(id:string, name:string, description:string, price:number):Observable<Listing>{
    return new Observable<Listing>(observer=>{
      this.auth.currentUser?.getIdToken().then(token=>{
        this.http.post<Listing>(
          `/api/listings/${id}`,
          {name, description, price},
          httpOptionsWithAuthToken(token),
        ).subscribe(()=>observer.next());
      })
    });
  }
}