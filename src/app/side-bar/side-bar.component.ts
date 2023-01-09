import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, RouteConfigLoadEnd, Router } from '@angular/router';
import { IUserProvider } from '../Handlers/Contracts/IUserProvider';
import { UserProvider } from '../Handlers/Implementations/UserProvider';
import { ServerConnectionService } from '../Services/server-connection.service';

@Component({
  selector: 'SideBar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  public userProvider: IUserProvider

  constructor(private serverProvider:ServerConnectionService, private route: ActivatedRoute, private router: Router) { 
    this.userProvider = new UserProvider(serverProvider);
  }

  ngOnInit(): void {
  }

  public logOut():void{
    this.userProvider.logOut().then((success)=>{
      if( success){
        this.router.navigate(['/login'],{relativeTo: this.route})
      } else{
        console.log('error logging out');
      }  
    });

  }

}
