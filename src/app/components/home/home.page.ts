import { Component, OnInit, OnDestroy, OnChanges, HostListener } from '@angular/core';
import { Event } from '../../models/event.model';
import { EventService } from 'src/app/services/event.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  model: Event;

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if(this.authService.isConnected && this.authService.isConnected != undefined){
      this.authService.isLoading= true;
      this.loadItems('http://localhost:53478/api/Event/GetEventByUserId/' + this.authService.user.id);
    }else{
      this.router.navigateByUrl('/login');
    }
  }

  loadItems(url: string){
    this.eventService.getAll(url).subscribe(
      data => {
        this.model = data;
        this.authService.isLoading= false;
      }
    )
  }
}
