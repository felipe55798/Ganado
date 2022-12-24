import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PositionsService } from '../../services/customers/positions.service';
import { Toast } from 'src/app/shared/models/toast';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],

})
export class TableComponent implements OnInit {

  @Input() data: any | undefined;

  @Input() positions: any | undefined;

  @Input() menuItem: any | undefined;

  @Output() generatedMarkers: EventEmitter<any> = new EventEmitter();

  sumHeadCount: number = 0;
  sumCustomers: number = 0;
  sumVisits: number = 0;
  sumProductivity: number = 0;
  loaded = false;

  customers: any[] = [];
  managements: any[] = [];
  charges: any[] = [];
  zones: any[] = [];

  sharedCustomers: any[] = [];

  auxCharges: any[] = [];
  auxZones: any[] = [];
  auxCustomers: any[] = [];

  filteredCharges: any[] = [];

  initData: any[] = [];
  displayData: any[] = [];

  markers: any[] = [];

  hiddenCols: any[] = [];


  itemDisplay = "Gerencia";


  loadedPositions: boolean = false;
  visitsPerDay = 0;

  selectedCharges: any[] = [];

  cols: any[] = [];

  colors: any[] = [];

  toast!: Toast;
  subMenu = [{
    name: 'GERENCIA', value: 'Gerencia'
  },
  { name: 'CARGO', value: 'Cargo' },
  { name: 'ZONA', value: 'Zona' },
  { name: 'POCS', value: 'Pocs' },
  ]

  formatColumns(value: string) {
    if (value === 'POCS') {
      //Get the columns that are not in the hiddenCols array
      let keys = Object.keys(this.customers[0]);
      this.hiddenCols = [];
      keys.forEach(key => {
        if (key != 'CodigoGerencia' && key != 'Gerencia' && key != 'CodigoRegional' && key != 'Regional' && key != 'Columns' && key != 'UnidadNegocio' && key != 'UniNegocio' && key != 'Dia' && key != 'Frecuencia' && key != 'Cliente' && key != 'Color') {
          this.hiddenCols.push({ field: key.toString(), header: key.toString(), checked: false });
        }
      })
      //Set the initial Columns
      this.cols = [
        { field: 'Columnas', header: 'Columnas', checked: true },
        { field: 'CodigoCliente', header: 'Código', checked: true },
        { field: 'Cliente', header: 'Cliente', checked: true },
        { field: 'Direccion', header: 'Dirección', checked: true },
        { field: 'SubCanal', header: 'Sub-canal', checked: true },
        { field: 'TipoNegocio', header: 'Tipo de Negocio', checked: true },
        { field: 'Frecuencia', header: 'Frecuencia de Visitas', checked: true },
        { field: 'Dia', header: 'Día de Visita', checked: true },
      ];
      this.displayData = [];
      this.displayData = this.customers;

      if (this.selectedCharges.length > 0) {
        this.displayData = this.displayData.filter(x => this.selectedCharges.includes(x.Cargo));
      }

    }
    else if (value === 'ZONA') {
      this.cols = [
        { field: 'Representante', header: 'Representante' },
        { field: 'Cargo', header: 'Cargo' },
        { field: 'TotalClientes', header: 'Total Clientes' },
        { field: 'SumatoriaVisitas', header: 'Sumatoria Visitas' },
        { field: 'PorcentajeProductividad', header: 'Porcentaje Productividad' },
      ];
      this.displayData = [];
      this.displayData = this.zones;

      if (this.selectedCharges.length > 0) {
        this.displayData = this.displayData.filter(x => this.selectedCharges.includes(x.Cargo));
      }

    }
    else if (value === 'CARGO') {
      this.cols = [
        { field: 'Cargo', header: 'Código' },
        { field: 'TotalHeadCount', header: 'Total Head Count' },
        { field: 'TotalClientes', header: 'Total Clientes' },
        { field: 'SumatoriaVisitas', header: 'Sumatoria Visitas' },
        { field: 'PorcentajeProductividad', header: 'Porcentaje Productividad' },
      ];
      this.displayData = [];
      //this.displayData = this.charges;
      if (this.selectedCharges.length > 0) {
        this.displayData = this.auxCharges;
      }
      else {
        this.displayData = this.charges;
      }
      //this.filterByCharges();
    }
    else if (value === 'GERENCIA') {
      this.cols = [
        { field: 'Color', header: '' },
        { field: 'CodigoGerencia', header: 'Código' },
        { field: 'Gerencia', header: 'Gerencia' },
        { field: 'TotalHeadCount', header: 'Total Head Count' },
        { field: 'TotalClientes', header: 'Total Clientes' },
        { field: 'SumatoriaVisitas', header: 'Sumatoria Visitas' },
        { field: 'PorcentajeProductividad', header: 'Porcentaje Productividad' },
      ];
      this.displayData = [];
      this.displayData = this.managements;
    }
  }


  setDefaultToast() {
    this.toast = {
      show: false,
      text: '',
      icon: '',
      color: '',
    };
  }

  selectCols() {
    const dialog = this.dialog.open(FormComponent, {
      width: '700px',
      data: this.hiddenCols
    });
  }

  //Set a Color for each Management
  setColor() {
    //Generate random color while the color is not in the colors array
    var o = Math.round, r = Math.random, s = 255;
    //let color = 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
    let color = 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + '0.9' + ')';
    let exist = this.existColor(color);
    //Avoid to have the same color and white color
    while (exist || color === 'rgba(0,0,0,0)') {
      var o = Math.round, r = Math.random, s = 255;
      color = 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + '0.9' + ')';
      exist = this.existColor(color);
    }
    this.colors.push(color);
    return color;
  }

  //Check if the color is already in the colors array
  existColor(color: string) {
    let exist = this.colors.find(x => x === color);
    if (exist) {
      return true;
    }
    else {
      return false;
    }
  }


  //Create "Google Markers"
  generateMarkers(customers: any[]) {
    customers.forEach((customer: any) => {
      //Generando marcadores
      let color = customer.Color;
      let icon;
      console.log('Color dentro del cliente: ' + color);
      if (color.length > 1) {
        let color1 = color[0];
        let color2 = color[1];
        console.log('Ambos colores son: ' + color1 + ' y ' + color2);
        console.log('Varios Colores', color);
        icon = `data:image/svg+xml;utf8,<svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gradient">
            <stop offset="5%" stop-color="rgba(129,96,139,0.5)"/>
            <stop offset="95%" stop-color="rgba(19,20,139,0.5)"/>
          </linearGradient>
        </defs>
        <path d="M18.1153 41.0418C24.4921 33.2109 31.8837 23.6897 31.8837 15.8169C31.8837 7.08145 24.8023 0 16.0669 0C7.33145 0 0.25 7.08145 0.25 15.8169C0.25 23.6812 7.80128 33.1903 14.0503 41.0164C15.0879 42.3159 17.0653 42.3312 18.1153 41.0418Z" fill="url(#gradient)"/>
        <circle cx="16" cy="15" r="8" fill="white"/>
      </svg>`
        console.log('Iconos es: ' + icon);
      }
      else {
        icon = `data:image/svg+xml;utf8,<svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.1153 41.0418C24.4921 33.2109 31.8837 23.6897 31.8837 15.8169C31.8837 7.08145 24.8023 0 16.0669 0C7.33145 0 0.25 7.08145 0.25 15.8169C0.25 23.6812 7.80128 33.1903 14.0503 41.0164C15.0879 42.3159 17.0653 42.3312 18.1153 41.0418Z" fill="${color}"/>
        <circle cx="16" cy="15" r="8" fill="white"/>
        </svg>`
      }

      let lat = customer.LatitudVentas;
      let lng = customer.LongitudVentas;

      //Validate if the customer has a Latitude and Longitude
      if (lat != null && lng != null) {
        if (lat.includes(',')) {
          lat = lat.replace(',', '.');
        }

        if (lng.includes(',')) {
          lng = lng.replace(',', '.');
        }
      }

      lat = parseFloat(lat);
      lng = parseFloat(lng);

      //Check if the customer has a Latitude and Longitude valid
      let isLatitude = (lat: number) => isFinite(lat) && Math.abs(lat) <= 90;
      let isLongitude = (lng: number) => isFinite(lng) && Math.abs(lng) <= 180;

      if (isLatitude(lat) && isLongitude(lng)) {
        let marker = {
          position: {
            lat: parseFloat(lat),
            lng: parseFloat(lng)
          },
          options: {
            icon: icon,
            animation: google.maps.Animation.BOUNCE,
            draggable: false,
            clickable: true,
          }
        }
        this.markers.push(marker);
      }
      else {
        //If the customer has no Latitude and Longitude, it will be ignored
        alert('Error en las coordenadas: ' + lat + ' , ' + lng + ' en la Gerencia ' + customer.Gerencia);
        lat = 0;
        lng = 0;
      }


    })
    //Send markers to parent before generate
    this.generatedMarkers.emit(this.markers);
  }

  constructor(private positionsService: PositionsService, public dialog: MatDialog) {
    this.initData = this.data;
  }

  //Global filter for all tables
  filterData(event: any) {
    if (this.menuItem === 'POCS') {
      if (event.target.value === '') {
        this.displayData = this.customers;
      }
      else {
        this.displayData = this.customers.filter(customer => {
          return customer.Cliente.toLowerCase().includes(event.target.value.toLowerCase() || customer.CodigoCliente.toLowerCase().includes(event.target.value.toLowerCase()) || customer.Direccion.toLowerCase().includes(event.target.value.toLowerCase()));
        });
      }

    }
    else if (this.menuItem === 'GERENCIA') {
      if (event.target.value === '') {
        this.displayData = this.managements;
      }
      else {
        this.displayData = this.managements.filter(management => {
          return management.CodigoGerencia.toLowerCase().includes(event.target.value.toLowerCase() || management.Gerencia.toLowerCase().includes(event.target.value.toLowerCase()) || management.PorcentajeProductividad.toLowerCase().includes(event.target.value.toLowerCase()));
        });
      }

    }
    else if (this.menuItem === 'ZONA') {
      if (event.target.value === '') {
        this.displayData = this.zones;
      }
      else {
        this.displayData = this.zones.filter(zone => {
          return zone.Representante.toLowerCase().includes(event.target.value.toLowerCase() || zone.Cargo.toLowerCase().includes(event.target.value.toLowerCase()) || zone.PorcentajeProductividad.toLowerCase().includes(event.target.value.toLowerCase()));
        });
      }
    }
    else if (this.menuItem === 'CARGO') {
      if (event.target.value === '') {
        this.displayData = this.charges;
      }
      else {
        this.displayData = this.charges.filter(charge => {
          return charge.Cargo.toLowerCase().includes(event.target.value.toLowerCase() || charge.CodigoGerencia.toLowerCase().includes(event.target.value.toLowerCase()) || charge.PorcentajeProductividad.toLowerCase().includes(event.target.value.toLowerCase()));
        });
      }
    }
  }


  async toastError(message: string) {
    this.toast.show = true;
    this.toast.text = message;
    this.toast.icon = 'Info.svg';
    this.toast.color = '#FF6F71';
    await new Promise(resolve => setTimeout(resolve, 3000)); //Delay 3 seconds
    this.toast.show = false;
  }

  cleanData() {
    this.initData = [];
    this.displayData = [];
    this.markers = [];
    this.charges = [];
    this.managements = [];
    this.customers = [];
    this.zones = [];
    this.auxCharges = [];
    this.auxCustomers = [];
    this.auxZones = [];
    this.cols = [];
    this.selectedCharges = [];
  }

  ngOnInit() {
    this.cleanData();
    //console.log('Loaded', this.loaded);
    this.setDefaultToast();
    this.initData = this.data;
    if (this.positions) {
      this.formatColumns(this.menuItem);
      this.loadManagement();
      //Generate Initial Markers
      this.generateMarkers(this.customers);
      //Create totals
      this.managements.forEach(element => {
        //Set the totals
        this.sumCustomers += element.TotalClientes;
        this.sumHeadCount += element.TotalHeadCount;
        this.sumVisits += element.SumatoriaVisitas;
      });
      //console.log('SumProductivity', this.sumProductivity);
    }
    else {
      alert('No se encontraron datos suficientes sobre los cargos');
    }

  }


  selectTab(event: any) {
    this.menuItem = event.tab.textLabel;
    this.formatColumns(event.tab.textLabel);
  }


  //Get Zones per representative and the associated Customers
  loadZones(representative: any) {
    var totalProductivity = 0;
    let visitsPerDay = 0;
    //Get the positions in database to compare and get days and configurations
    let storedCharge = this.positions.find((a: { name: any; }) => a.name === representative.Cargo);
    if (storedCharge) {
      visitsPerDay = storedCharge.visitsperday;
    }
    else {
      console.log('No se encontraron configuradas las Visitas por días del cargo ' + representative.Cargo);
      visitsPerDay = 1; //No configuration found, set to 1
    }
    //Get customers associated with the representative
    let associatedCustomers = this.customers.filter(a => a.Representante === representative.Representante);
    let totalCustomers = associatedCustomers.length;
    let days = []; //Array to store days
    //Get different days per Customers
    days = associatedCustomers.reduce((prev: any[], { Dia }: any) =>
      prev.some(x => x.Dia === Dia) ? prev : [...prev, { Dia }], [])

    //Get the total of customers per representative
    let totalVisits = days.length * totalCustomers;
    //Calculate the total of productivy per representative
    let total = totalCustomers / (totalVisits * visitsPerDay) * 4;
    totalProductivity = (total * 100);
    totalProductivity = Math.round(totalProductivity);

    let objZones = {
      'Representante': representative.Representante,
      'Cargo': representative.Cargo,
      'TotalClientes': totalCustomers,
      'SumatoriaVisitas': totalVisits,
      'PorcentajeProductividad': totalProductivity + '%'
    }
    //Push the zones in the array
    this.zones.push(objZones);
    this.auxZones.push(objZones);
    //Return the productivity
    return totalProductivity;
  }

  //Get the charge of the manager
  loadCharges(management: any) {
    //Init values
    let visitsPerDay = 0;
    let totalVisits = 0;
    let managementCode = management.CodigoGerencia;
    let color = management.Color;
    let colors: any[] = []; //To manage the different

    //Get Charges of the management
    let associatedCharges = this.initData.filter(a => a.CodigoGerencia === managementCode);
    //Get different charges
    const charges = Array.from(new Set(associatedCharges.map((a: { Cargo: any; }) => a.Cargo)))
      .map(Cargo => {
        return this.initData.find(a => a.Cargo === Cargo)
      });

    //Get Customers associated to each Charge
    charges.forEach(charge => {
      let arrayProductivity: number[] = [];
      //Iinit object to store charges
      let objCharge = {
        'Gerencia': management.Gerencia,
        'CodigoGerencia': management.CodigoGerencia,
        'Cargo': '',
        'TotalClientes': 0,
        'TotalHeadCount': 0,
        'SumatoriaVisitas': 0,
        'PorcentajeProductividad': ''
      };

      //CUSTOMERS SECTION
      let associatedCustomers = this.initData.filter(a => a.Cargo === charge.Cargo);
      //Check for the associated customers and push in the array
      associatedCustomers.forEach(customer => {
        //first check if the customer already exist with the CHARGE in the array
        let existsCustomer = this.customers.find(a => a.CodigoCliente === customer.CodigoCliente && a.Cargo === customer.Cargo);
        if (existsCustomer) {
          if (existsCustomer.Color) {
            let existColor = existsCustomer.Color.find((a: any) => a === color);
            if (!existColor) {
              existsCustomer.Color.push(color);
            }
          }
          else {
            existsCustomer.Color = [color];
          }
        }
        //If no exist, then create with the assigned color and charge
        else {
          let objCustomer = {
            ...customer,
            Color: [color]
          }
          this.customers.push(objCustomer);
          this.auxCustomers.push(objCustomer);
        }

      })
      //END OF CUSTOMERS SECTION

      let storedCharge = this.positions.find((a: { name: any; }) => a.name === charge.Cargo);
      if (!storedCharge) {
        alert('No se encontraron configurados los datos del cargo ' + charge.Cargo);
      }
      //Get Different Represents of the customers recently created
      const associatedRepresentatives = Array.from(new Set(associatedCustomers.map(a => a.Representante)))
        //Then map to find in the customers array 
        .map(Representante => {
          return this.customers.find(a => a.Representante === Representante)
        })

      //Functions to calculate per Zone
      let totalProductivityRepresentative: number | undefined = 0;
      associatedRepresentatives.forEach(representative => {
        if (representative.Cargo === charge.Cargo) {
          totalProductivityRepresentative = this.loadZones(representative);
          //Store in array the productivity of each representative
          arrayProductivity.push(totalProductivityRepresentative);
        }
      })
      //Promediate the array
      var sum = arrayProductivity.reduce((acc, cur) => acc + cur, 0);
      console.log('SUMA', sum)
      var avg = sum / arrayProductivity.length;
      //End of Functions to calculate per Zone

      let days = []; //Array to store worked days
      days = associatedCustomers.reduce((prev: any[], { Dia }: any) =>
        prev.some(x => x.Dia === Dia) ? prev : [...prev, { Dia }], [])
      //Calculate the total of visits per representative
      let totalCustomers = associatedCustomers.length;
      totalVisits = days.length * totalCustomers;
      //console.log('Total de visitas para este cargo de ', charge.Cargo, ' es: ', totalVisits);
      //Asign to Object
      objCharge.Cargo = charge.Cargo;
      objCharge.TotalClientes = associatedCustomers.length;
      objCharge.TotalHeadCount = associatedRepresentatives.length;
      objCharge.SumatoriaVisitas = totalVisits;
      objCharge.PorcentajeProductividad = Math.round(avg) + '%';
      this.charges.push(objCharge);
      this.auxCharges.push(objCharge);
    })
    return this.charges;
  }

  //Check if the data is from the management or from the POCS
  loadManagement() {

    if (this.initData) {
      //Get Different Managements from the data
      const managements = Array.from(new Set(this.initData.map(a => a.CodigoGerencia)))
        .map(CodigoGerencia => {
          return this.initData.find(a => a.CodigoGerencia === CodigoGerencia)
        })

      console.log('Gerencias disponibles', managements.length, ': ', managements);
      managements.forEach(async management => {
        //init object to store management
        let objManagement = {
          'Color': '',
          'CodigoRegional': '',
          'Regional': '',
          'CodigoGerencia': '',
          'Gerencia': '',
          'TotalClientes': 0,
          'TotalHeadCount': 0,
          'SumatoriaVisitas': 0,
          'PorcentajeProductividad': ''
        };
        //Asign Colors to the Managements
        let color = this.setColor();

        //Get customers associated with the representative
        let associatedCustomers = this.initData.filter(a => a.CodigoGerencia === management.CodigoGerencia);

        //Get the total of DIFFERENTS representatives per management
        let representatives = Array.from(new Set(associatedCustomers.map(a => a.Representante)))
          .map(Representante => {
            return associatedCustomers.find(a => a.Representante === Representante)
          })
        objManagement.TotalClientes = associatedCustomers.length;
        objManagement.TotalHeadCount = representatives.length;
        let days = []; //Array to store worked days
        days = associatedCustomers.reduce((prev: any[], { Dia }: any) =>
          prev.some(x => x.Dia === Dia) ? prev : [...prev, { Dia }], [])

        objManagement.SumatoriaVisitas = days.length * objManagement.TotalClientes;

        //Set the object to the array
        //console.log('Management antes de push', objManagement);

        objManagement.Color = color;
        objManagement.CodigoRegional = management.CodigoRegional;
        objManagement.Regional = management.Regional;
        objManagement.CodigoGerencia = management.CodigoGerencia;
        objManagement.Gerencia = management.Gerencia;

        //Push the object to the array
        this.managements.push(objManagement);

        //Get charges for this management
        let charges = await this.loadCharges(objManagement);
        //Get prodictivity for this management getting the prodictivity of each charge
        let arrayProductivity: number[] = [];
        charges.forEach(charge => {
          let productivity = charge.PorcentajeProductividad;
          arrayProductivity.push(parseFloat(productivity));
        })
        var sum = arrayProductivity.reduce((acc, cur) => acc + cur, 0);
        var avg = sum / arrayProductivity.length;

        //Alternative to calculate the average in the total
        this.sumProductivity += avg;

        //Integrate the percent with the average 
        objManagement.PorcentajeProductividad = Math.round(avg) + '%';


      })
      console.log('Array managments ', this.managements);

    }
  }


  filterCharges(event: any) {
    this.selectedCharges = [];
    if (event === [] || event.length === 0) {
      //this.charges = this.auxCharges;
      //this.zones = this.auxZones;
      //this.customers = this.auxCustomers;
      this.displayData = this.charges;
    }
    else {
      event.forEach((element: any) => {
        //Get the selected charges to filter
        this.selectedCharges.push(element.Cargo);
        console.log('Selected Charges', this.selectedCharges);
      })
      this.displayData = this.charges.filter(charge => this.selectedCharges.includes(charge.Cargo));
      this.displayMarkerPerCharges();
    }
  }


  displayMarkerPerCharges() {
    if (this.selectedCharges != []) {
      this.markers = [];
      this.selectedCharges.forEach((charge: any) => {
        let associatedCustomers = this.customers.filter(a => a.Cargo === charge);
        this.generateMarkers(associatedCustomers);
      })
    }
    else {
      this.markers = [];
      this.generateMarkers(this.customers);
    }
  }


  showColumns(event: any) {
    //console.log('Evento', event);
    if (event != []) {
      event.forEach((element: any) => {
        //console.log('Elemento del event es', element);
        let exist = this.cols.find(a => a.field === element.field);
        if (!exist) {
          this.cols.push(element);
        }
      })
    }
  }

}
