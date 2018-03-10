import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, ActivatedRouteSnapshot, Params, Router, RouterStateSnapshot} from '@angular/router';
import {CanComponentDeactviate} from './can-deactivate-guard.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactviate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
 //   console.log(this.route.snapshot.queryParams);
 //   console.log(this.route.snapshot.fragment);
    this.route.queryParams.
    subscribe(
      (queryParms: Params) => {
        this.allowEdit = queryParms['allowEdit'] === '1' ? true : false;
        const serverId = +queryParms['id'];
        this.server = this.serversService.getServer(serverId);
      }
    );
    this.route.fragment.subscribe();
    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean  {
    if (!this.allowEdit) {
      return true;
    }
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status)
      && (!this.changesSaved)) {
      return confirm('Do you want to discard changes');
    } else {
      return true;
    }
  }

}