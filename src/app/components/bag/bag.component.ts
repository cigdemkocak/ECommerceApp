import { Component, OnInit } from '@angular/core';
import { CardapiService } from 'src/app/services/cardapi.service';

@Component({
  selector: 'app-bag',
  templateUrl: './bag.component.html',
  styleUrls: ['./bag.component.css']
})
export class BagComponent implements OnInit {
  products: any = [];
  allProducts: any =0;
  constructor(private cardApi: CardapiService) { }

  ngOnInit(): void {
    this.cardApi.getProductData().subscribe(res => {
      this.products = res;
      this.allProducts = this.cardApi.getTotalAmount(); 
    })
  }

  removeProduct(item:any){
    this.cardApi.removeCardData(item);
  }

  removeAllProduct(){
    this.cardApi.removeAllCard();
  }


}
