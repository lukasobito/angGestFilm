import { Component, OnInit, OnChanges, Input } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public connectedMenu = [
    {
      title: 'Soirées',
      url: 'home',
      icon: 'list',
      isActive: true
    },
    {
      title: 'Groupes',
      url: 'group',
      icon: 'list',
      isActive: true
    },
    {
      title: 'Déconnexion',
      url: 'logout',
      icon: 'person',
      isActive: false
    }
  ];
  user: Subscription;
  userConnected: User;
  public appPages = [
    {
      title: 'Connexion',
      url: 'login',
      icon: 'person',
      isActive: true
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
