import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { HttpClient } from '@angular/common/http';
import { CardapiService } from 'src/app/services/cardapi.service';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productList:any;
  public filterCategory:any;
  searchKey:string= "";
  router: any;
  public hide: boolean ;
  constructor( private api: ApiService, private cardApi: CardapiService, private router2: Router , private http: HttpClient) {
    this.hide =true;
   }

  ngOnInit(): void {
    this.api.getProduct()
    .subscribe(res =>{
      this.productList = res;
      this.filterCategory = res;
      this.productList.forEach((a:any)=> {
        Object.assign(a,{quantity:1, total:a.price})
      });
      console.log(this.productList);
    });
    
    this.cardApi.search.subscribe((val:any) =>{
      this.searchKey = val;
    })
  }
  
  addToCard(item:any){
    this.cardApi.addToCard(item);
  }

  filter(category:string){
    this.filterCategory = this.productList
    .filter((a:any) => {
      if(a.category == category || category==''){
        return a;
      }
    })
  }

  productView(id:number){
    this.router2.navigateByUrl(`single/${id}`)
  }

  toggle(){
    this.hide = !this.hide;
  }

  


  
}
