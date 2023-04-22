import { Component, OnInit } from '@angular/core';
import { Marca, Modelo, Carro } from '../models/model.cars';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [DataService]
})

// export class FormComponent implements OnInit {
//   //public selectedCar: Marca = { id: 0, name: '' };
//   public marcas: Marca[];
//   public modelos: Modelo[];

//   constructor(private dataSvc: DataService) { }
//   ngOnInit(): void {
//    this.marcas = this.dataSvc.getMarca();
//   //  this.modelos = this.dataSvc.getModelo();
//   }
// }

export class FormComponent implements OnInit {
  public marcas: Marca[]  = [];
  public modelos: Modelo[]  = [];
  public selectedMarca: Marca = { id: 0, name: '' };
  public selectedModel: Modelo = { marcaId: 0, name: '' };

  public items: Carro[] = [];
  showAlert = false;


  constructor(private dataSvc: DataService) { }

  ngOnInit(): void {
    this.marcas = this.dataSvc.getMarca();
  }
  
  carroSeleccionado(event: any ): void {
  //  console.dir('id es', event.target.value.marca);
  const valorSeleccionado = event.target.value;
  const marcaSeleccionada = this.marcas.find(marca => marca.name == valorSeleccionado);
  //const nombreMarca = marcaSeleccionada?.name;
  const idMarca = marcaSeleccionada?.id;
    this.modelos = this.dataSvc.getModelo().filter(item => item.marcaId == idMarca);
    //this.textoMostrado2= ''; this.textoMostrado = '';
    this.selectedModel.name = '';
  }

  ocultarAlerta() {
    setTimeout(() => {
      this.showAlert = false;
    }, 2000); // tiempo en milisegundos
  }

  agregarCarro() {
    // this.textoMostrado = this.selectedMarca.name ;
    // this.textoMostrado2 = this.selectedModel.name ;

    const texto = this.selectedMarca.name;
    const texto2 = this.selectedModel.name;

    //console.log(texto2);
    if (texto2 != '') {
      this.items.push({ marca: texto, modelo: texto2 });
      console.log('Agregado');
    }else{
      this.showAlert = true;
      this.ocultarAlerta();
    //window.alert("Seleccionar un modelo del carro");
  }

  }

  
}
