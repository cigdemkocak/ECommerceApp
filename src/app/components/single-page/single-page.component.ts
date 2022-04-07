import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CardapiService } from 'src/app/services/cardapi.service';

@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrls: ['./single-page.component.css']
})
export class SinglePageComponent implements OnInit {
  products: Array<any>=[];
  singleProduct :any;
  constructor(private api: ApiService , private activatedRoute: ActivatedRoute , private cardApi: CardapiService ) { }

  ngOnInit(): void {
    let id= 0;
    this.activatedRoute.paramMap.subscribe((item: any) => {
      id= item.params.id;
    this.api.getProduct()
    .subscribe((res:any) =>{
      this.products =res
      this.products = this.products.filter((item:any) => item.id == id);
      this.singleProduct = this.products[0];
      
    },(err:any) =>{
      console.log(err)
    });
  })
  }

  addToCard(item:any){
    this.cardApi.addToCard(item);
  }
  

}
