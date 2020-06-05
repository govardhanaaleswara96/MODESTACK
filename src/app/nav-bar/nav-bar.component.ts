import { Component, OnInit } from '@angular/core';
import { ModeStackService } from '../mode-stack.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(private modeService: ModeStackService, private router: Router) {}

  ngOnInit(): void {}
  logout() {
    this.modeService.tokenRemove();
    this.router.navigate(['/login']);
  }
}
