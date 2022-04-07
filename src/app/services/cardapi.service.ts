import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CardapiService {
  cardDataList:any = [];
  productList= new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>('');

  constructor(private http:HttpClient) { }

  getProductData(){
    return this.productList.asObservable();
  }
  
  setProduct(product:any){
    this.cardDataList.push(...product);
    this.productList.next(product);
  }
 
  addToCard(product:any){
    this.cardDataList.push(product);
    this.productList.next(this.cardDataList);
    this.getTotalAmount();
    console.log(this.cardDataList);
  }
  
  getTotalAmount(){
    let grandTotal= 0;
    this.cardDataList.map((a:any) => {
      grandTotal += a.total;
    })
    return grandTotal;
  }
 
  removeCardData(product:any){
    this.cardDataList.map((a:any, index:any) => {
      if(product.id === a.id){
        this.cardDataList.splice(index,1);
      }
    })
    this.productList.next(this.cardDataList)
  }

  removeAllCard(){
    this.cardDataList= [];
    this.productList.next(this.cardDataList);
  }


  

}
