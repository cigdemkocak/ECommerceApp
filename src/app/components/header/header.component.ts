import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardapiService } from 'src/app/services/cardapi.service';
import { AuthService } from 'src/app/services/auth.service';
//import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  totalItemNumber: number = 0;
  public searchTerm !: string;
  constructor(private cardApi : CardapiService ,  private router: Router, public authService:AuthService) { }

  isLogin !: boolean;

  ngOnInit(): void {
    this.cardApi.getProductData().subscribe(res => {
      this.totalItemNumber = res.length;
    })

  }
  logout() {
    this.authService.logout()
  }
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cardApi.search.next(this.searchTerm);
  }
  



}
