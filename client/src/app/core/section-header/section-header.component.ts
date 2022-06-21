import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent implements OnInit {
  // any observable variable ends with $
  breadcrumb$:Observable<any[]>

  constructor(private bcService:BreadcrumbService) { }

  ngOnInit(): void {
    this.breadcrumb$=this.bcService.breadcrumbs$ // we get the total breadcrumb object where we have everything contained in it
  }

}
