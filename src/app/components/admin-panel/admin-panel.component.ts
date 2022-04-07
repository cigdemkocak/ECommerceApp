import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductModel } from 'src/app/models/admin-panel.model';
import { ApiService } from 'src/app/services/api.service';



@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  formValue! : FormGroup;
  productModelObj : ProductModel = new ProductModel();
  productData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor( private formBuilder: FormBuilder , private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      id: [''],
      category: [''],
      image: [''],
      description: [''],
      title: [''],
      price: [''],
      quantity: ['']
    })
    this.getAllProduct();
  }

  postProductDetails(){
    this.productModelObj.id = this.formValue.value.id;
    this.productModelObj.category = this.formValue.value.category;
    this.productModelObj.image = this.formValue.value.image;
    this.productModelObj.title = this.formValue.value.title;
    this.productModelObj.description = this.formValue.value.description;
    this.productModelObj.price = this.formValue.value.price;
    this.productModelObj.quantity = this.formValue.value.quantity;

    this.api.postProduct(this.productModelObj)
    .subscribe(res => {
      console.log(res);
      alert("Product Added Successfuly");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
    },
    err =>{
      alert("Something went wrong");
    })
  }
  clickAddProduct(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
    
  }

  getAllProduct(){
    this.api.getProduct().subscribe(res =>{
      this.productData = res;
    })
  }

  deleteProduct(row: any){
    this.api.deleteProduct(row.id)
    .subscribe(res =>{
      alert("Product deleted");
      this.getAllProduct();
    })
  }

  onEdit(row : any){
    this.showAdd = false;
    this.showUpdate = true;
    this.productModelObj.id = row.id;
    this.formValue.controls['category'].setValue(row.category);
    this.formValue.controls['image'].setValue(row.image);
    this.formValue.controls['title'].setValue(row.title);
    this.formValue.controls['description'].setValue(row.description);
    this.formValue.controls['price'].setValue(row.price);
    this.formValue.controls['quantity'].setValue(row.quantity);
  }

  updateProductDetails(){
    this.productModelObj.category = this.formValue.value.category;
    this.productModelObj.image = this.formValue.value.image;
    this.productModelObj.title = this.formValue.value.title;
    this.productModelObj.description = this.formValue.value.description;
    this.productModelObj.price = this.formValue.value.price;
    this.productModelObj.quantity = this.formValue.value.quantity;
    this.api.updateProduct(this.productModelObj, this.productModelObj.id)
    .subscribe(res =>{
      alert("Updated Successfuly")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllProduct();
    })

  }

  
  canExit(): boolean {
    if (this.formValue.dirty && !this.formValue.pristine) {
      if (confirm('Do you wish?')) {
        return true;
      }
      return false;
    }
    return true;
  }
  
}
