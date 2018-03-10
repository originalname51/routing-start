import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
/*    const initialServerId = +this.route.queryParams['id'];
    this.server = this.serversService.getServer(initialServerId);
    this.route.params.subscribe(
        (params: Params) => {
          const serverId = Number(params['id']);
          const server = this.serversService.getServer(serverId);
            this.server = server;
        }
      );
      */
    this.route.data.
    subscribe(
      (data: Data) => {
        this.server = data['server'];
      }
    );

  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route
    , queryParamsHandling: 'preserve'});
  }
}
