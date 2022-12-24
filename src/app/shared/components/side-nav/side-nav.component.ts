import { Component, Input, OnInit } from '@angular/core';
import { INavigator } from 'src/providers/Navigation/contracts';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @Input() sidenav: any;
  menuLinks = [
    // {name:'RUTEO', route:'pages/routing',icon:'alt_route'},
    // {name:'USUARIOS', route:'pages',icon:'people'},
    // {name:'CONFIGURACIÓN', route:'pages/config',icon:'settings'},
    // {name:'REPORTES', route:'pages',icon:'description'},
    {name:'FAQ', route:'pages/home',icon:'quiz'}
  ];
  constructor(private navigateService: INavigator) {
    this.navigateService.Push([this.menuLinks[0].route ?? ''],this.menuLinks[0].route ?? '');
   }

  ngOnInit(): void {
  }

  /**
   * Navegar hacia una de las opciones de menú
   * @param menu, menú seleccionado.
   */
  navigate(menu: any){
    this.navigateService.Push([menu?.route ?? ''],menu?.route ?? '');
  }
}
