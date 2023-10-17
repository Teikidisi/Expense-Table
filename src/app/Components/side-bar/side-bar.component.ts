import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Route, RouteConfigLoadEnd, Router } from '@angular/router';
import { IUserProvider } from '../../Handlers/Contracts/IUserProvider';
import { UserProvider } from '../../Handlers/Implementations/UserProvider';
import { ServerConnectionService } from '../../Services/server-connection.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
  animations:[
    trigger('openClose', [
      state('openedSidebar',style({
        height: '100vh',
        width: '14.375rem'
      })),
      state('closedSidebar',style({
        height:'fit-content',
      })),
      transition('openedSidebar => closedSidebar', [
        animate('300ms')
      ]),
      transition('closedSidebar => openedSidebar',[
        animate('300ms')
      ])
    ])
  ]
})
export class SideBarComponent implements OnInit {

  public userProvider: IUserProvider
  public isSidebarShown: boolean = false;

  constructor(private serverProvider:ServerConnectionService, private route: ActivatedRoute, private router: Router, private element:ElementRef, private renderer:Renderer2) { 
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

  public toggleSidebar(){
    this.isSidebarShown = !this.isSidebarShown;
    let sidebar = this.element.nativeElement.querySelector('.sidebar');
    let sidebarObjects = this.element.nativeElement.querySelector('.sidebarObjects');
    let openButton = this.element.nativeElement.querySelector('.openButton');
    let closeButton = this.element.nativeElement.querySelector('.closeButton');
    if(this.isSidebarShown){
      sidebar.style.width = "14.375rem";
      closeButton.style.display = 'block';
      openButton.style.display = 'none';
      sidebarObjects.style.display = 'block';
    } else{
      sidebar.style.width = "0px";
      closeButton.style.display = 'none';
      openButton.style.display = 'block';
      sidebarObjects.style.display = 'none';
    }
  }

}
