import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavegationService } from 'src/app/shared/services/navegation/navegation.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit,OnChanges {
  baseUrl: string = 'pages/config';

  //Indice en el arreglo de menus de catalogos
  @Input() indexMenuSelected!: number; 

  menuLinks = [
    {name:'Canales', route:`${this.baseUrl}/channels`,icon:'alt_route'},
    {name:'Cargos', route:`${this.baseUrl}/charges`,icon:'people'},
    {name:'Otros Parámetros', route:`${this.baseUrl}/catalogs`,icon:'settings'},
  ];

  activeLink: any;
  constructor(private navegationService: NavegationService,) { 
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['indexMenuSelected']) {
      this.navegationService.navigate(this.menuLinks[this.indexMenuSelected]?.route ?? '');
      this.activeLink = this.menuLinks[this.indexMenuSelected];
    }
  }

  ngOnInit(): void {
  }

   /**
   * Navegar hacia una de las opciones de parámetros
   * @param menu, tab seleccionado. 
   */
    navigate(menu: any){
      this.navegationService.navigate(menu?.route ?? '');
      this.activeLink = menu;
    }
}
