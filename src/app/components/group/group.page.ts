import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';
import { Group } from 'src/app/models/group.model';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {

  public model: Group;

  constructor(
    private authService: AuthService,
    private router: Router,
    private groupService: GroupService
  ) { }

  ngOnInit() {
    if(this.authService.isConnected && this.authService.isConnected != undefined){
      this.authService.isLoading= true;
      this.loadItems('http://localhost:53478/api/Group/GetGroupByUserId/' + this.authService.user.id);
    }else{
      this.router.navigateByUrl('/login');
    }
  }

  loadItems(url: string){
    this.groupService.getAll(url).subscribe(
      data => {
        this.model = data;
        this.authService.isLoading= false;
      }
    )
  }

}
