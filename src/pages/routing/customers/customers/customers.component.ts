import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { csvToJSON } from 'src/app/shared/utils/csvTextToJson';
import { jsonHasProperties } from 'src/app/shared/utils/jsonHasProperties';
import { CustomersService } from '../../services/customers/customers.service';
import { INavigator } from 'src/providers/Navigation/contracts/navigator.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Toast } from 'src/app/shared/models/toast';
import { ParamsService } from 'src/providers';
import { TableComponent } from '../table/table.component';
import { PositionsService } from '../../services/customers/positions.service';

declare var google: any;

@Component({
  //changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  //Send to Table
  @Output() submenuItem = new EventEmitter<String>();
  //@Input() markers: any | undefined;

  title = "Customers";
  markers: any[] = [];
  googleMarker: google.maps.Marker[] = [];
  subMenu = [{
    name: 'GERENCIA', value: 'Gerencia'
  },
  { name: 'CARGO', value: 'Cargo' },
  { name: 'ZONA', value: 'Zona' },
  { name: 'POCS', value: 'Pocs' },
  ]
  validated = false;
  panelOpenState = false;
  customer: any[] = [];
  validatedCustomers: any[] = [];
  form!: FormGroup;
  selectedFile: any;
  propertiesCSV = ['CodigoRegional', 'Regional', 'CodigoGerencia', 'Gerencia', 'UnidadNegocio', 'UniNegocio', 'CodigoCliente', 'Cliente', 'LongitudVentas', 'LatitudVentas', 'Barrio', 'Direccion', 'Departamento', 'Municipio', 'TipoPoblacion', 'Cargo', 'Dia', 'Frecuencia', 'Representante'];
  fileName = "Aún no hay archivo seleccionado";
  fileInfo = "Carga o arrastra un archivo .csv para poder importar los datos.";
  //selectedFile: File;
  toast!: Toast;
  cleanFiles = true;
  selected = false;
  selectedTab = false;
  menuItem = 'GERENCIA';
  positions: any[] = [];

  

  constructor(private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef, private customersService: CustomersService, private snackBar: MatSnackBar, private positionsService : PositionsService, private cdr: ChangeDetectorRef ) { 
    }

  ngOnInit(): void {
    this.buildForm();
    this.setDefaultToast();
    this.loadPositions();
  }

   //Load the positions to compare
   loadPositions() {
    this.positionsService.getPositions().subscribe({
      next: (res: any) => {
        console.log('Positions received', res.data);
        this.positions = res.data;
      },
      error: (err: any) => {
        console.log('Error', err);
        
      }
    });
  }


  receiveMarkers(event: any) {
    //console.log('Markers', event);
    this.setMarkers(event);
  }

  ngAfterContentInit() {
    //this.markers
    console.log('Markers', this.markerPositions);
  }

  setMarkers(markers: any) {
    //this.markers = markers;
    this.markers = [];
    markers.forEach((element: any) => {
      this.zoom = 6;
      this.markers.push({
        position: element.position,
        title: element.title,
        icon: element.options.icon
      });
      this.cdr.detectChanges(); //Prevent NGR error
    })
  }

  //Default Toast message
  setDefaultToast() {
    this.toast = {
      show: false,
      text: '',
      icon: '',
      color: '',
    };
  }

  buildForm() {
    this.form = this.formBuilder.group({
      csvFile: [null, [Validators.required]],
    });
  }

  loadData(data: any) {
    //console.log('Data to send', data);
    this.validated = true;
    this.validatedCustomers = [];
    this.validatedCustomers = data;
  }

  async toastSuccess(message: string) {
    this.toast.show = true;
    this.toast.text = message;
    this.toast.icon = 'Info.svg';
    this.toast.color = '#34eb92';
    await new Promise(resolve => setTimeout(resolve, 3000)); //Delay 3 seconds
    this.toast.show = false;
  }

  async toastWarning(message: string) {
    this.toast.show = true;
    this.toast.text = message;
    this.toast.icon = 'Info.svg';
    this.toast.color = '#FFFF00';
    await new Promise(resolve => setTimeout(resolve, 3000)); //Delay 3 seconds
    this.toast.show = false;
  }

  async toastError(message: string) {
    this.toast.show = true;
    this.toast.text = message;
    this.toast.icon = 'Info.svg';
    this.toast.color = '#FF6F71';
    await new Promise(resolve => setTimeout(resolve, 3000)); //Delay 3 seconds
    this.toast.show = false;
  }

  uploadFile(customers: any) {
    //console.log("uploadFile ", customers);
    this.customersService.uploadCustomers(customers).subscribe({
      next: (data) => {
        //console.log("Data validated ", data);
        this.selected = true;
        this.loadData(data.data);
        this.toastSuccess(data.message);
      },
      error: (err) => {
        this.toastError(err.error.error);
        //If error reset the values and files.
        this.deleteNameFileSelected();
        this.customer = [];
        this.fileInfo = "Carga o arrastra un archivo .csv para poder importar los datos.";
        this.selected = false;
      }
    });
  }


  deleteNameFileSelected() {
    this.cleanFiles = !this.cleanFiles;
    this.selectedFile = {};
    this.cdRef.detectChanges();
  }

  onDragOver(event: any) {
    event.preventDefault();
  }

  // From drag and drop
  onDropSuccess(event: any) {
    event.preventDefault();
    this.onFileChange(event.dataTransfer.files[0]);
  }

  // From attachment link
  onChange(event: any) {
    this.cleanData();
    this.onFileChange(event.target.files[0]);
  }

  cleanData() {
    this.deleteNameFileSelected();
    this.customer = [];
    this.markers = [];
    this.selected = false;
    this.validatedCustomers = [];
    this.selectedFile = {};
    this.fileInfo = "Carga o arrastra un archivo .csv para poder importar los datos.";
  }

  private onFileChange(file: File) {
    if (file) {
      this.cleanData();
      this.toast.show = false;
      var lastModifiedDate = new Date(file.lastModified);
      this.fileName = file.name;
      this.fileInfo = "Última edición : " + lastModifiedDate.toLocaleDateString() + " " + lastModifiedDate.toLocaleTimeString();

      if (
        file.type === "text/csv" ||
        file.type === "text/x-csv" ||
        file.type === "text/plain" ||
        file.type === "application/vnd.ms-excel" ||
        file.type === "application/csv" ||
        file.type === "application/x-csv" ||
        file.type === "text/comma-separated-values" ||
        file.type === "text/x-comma-separated-values"
      ) {
        //console.log('File is csv')
        this.form.controls['csvFile'].setErrors(null);
        const reader = new FileReader();
        reader.readAsText(file);
        console.log("File charged", file); // File
        reader.onload = () => {
          let data = csvToJSON(reader.result);
          console.log('Data', data);
          let error = false;
          if (data?.length === 0) {
            // No hay datos
            this.form.controls['csvFile'].setErrors({
              noRows: "El archivo seleccionado no tiene datos.",
            });
            this.toast.show = true;
            this.toast.text = "El archivo seleccionado no tiene datos.";
            this.toast.icon = 'Info.svg';
            this.toast.color = '#FF6F71';
            this.deleteNameFileSelected();
          }

          let keys = Object.keys(data[0]);

          //Check Withespaces in columns
          keys.forEach((key: any) => {
            let whiteSpace = this.hasWhiteSpace(key);
            if (whiteSpace) {
              alert("El nombre de la columna " + key + " no debe contener espacios.");
            }
          })

          for (const value of data) {
            if ('CodigoRegional' in value && 'Regional' in value && 'CodigoGerencia' in value && 'Gerencia' in value && 'UnidadNegocio' in value && 'UniNegocio' in value && 'CodigoCliente' in value && 'Cliente' in value && 'LongitudVentas' in value && 'LatitudVentas' in value && 'Barrio' in value && 'Direccion' in value && 'Departamento' in value && 'Municipio' in value && 'TipoPoblacion' in value && 'Cargo' in value && 'Dia' in value && 'Frecuencia' in value && 'Representante' in value) {
              //console.log('Tiene Los requeridos');whiteSpace.trim()
            }
            else {
              error = true;
              break;
            }
          }
          if (error) {
            this.form.controls['csvFile'].setErrors({
              columnasIncorrectas:
                "La estructura del archivo no concuerda con el estándar.",
            });
            this.toastWarning("La estructura del archivo no concuerda con el estándar.");
            this.selected = false;
          }
          else {
            this.selectedFile = file;

            //Asign the data to the array
            this.customer = data;
            //console.log('Customer', this.customer);
            const objCustomers = { Customers: this.customer };
            this.uploadFile(objCustomers);
          }

        };
      } else {
        this.form.controls['csvFile'].setErrors({
          extension: "Formato de archivo no soportado",
        });
        this.toast.show = true;
        this.toast.text = "Formato de archivo no soportado";
        this.toast.icon = 'Info.svg';
        this.toast.color = '#FF6F71';
        this.deleteNameFileSelected();
        this.selected = false;
      }
    } else {
      this.fileName = "Aún no hay archivo seleccionado";
      this.form.controls['csvFile'].setErrors({
        extension: "Debe seleccionar un archivo con extension .csv",
      });
      this.selected = false;
    }
  }

   hasWhiteSpace(string: string) {
    return /\s/g.test(string);
  }

  addMarker(event: google.maps.MapMouseEvent) {
    //this.markerPositions.push(event.latLng.toJSON());
    console.log("Marker", event);
  }


  //Maps inicialization
  position = {
    lat: 4.667663,
    lng: -74.095842
  };
  zoom = 15;
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    //title: 'My Marker',
    //label: 'A'
  };
  markerLabel = [];
  markerPositions: google.maps.LatLngLiteral[] = [];
  options = {
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER,
    },
    scaleControl: true,
    streetViewControl: true,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER,
    },
  }

  label = {
    color: 'red',
    text: 'Customers'
  }

  selectTab(event: any) {
    //Send the selected tab to the Table
    this.menuItem = event.tab.textLabel;
  }


}


