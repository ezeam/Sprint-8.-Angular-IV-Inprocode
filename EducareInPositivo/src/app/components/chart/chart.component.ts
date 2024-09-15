import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiPieChart, TuiAxes, TuiBarChart } from '@taiga-ui/addon-charts';
import { TuiAmountPipe } from '@taiga-ui/addon-commerce';
import { TuiHint } from '@taiga-ui/core';
import { SaleService } from '../../services/sale.service';
import { tuiCeil } from '@taiga-ui/cdk';
 
@Component({
    standalone: true,
    exportAs: "ChartComponent",
    imports: [AsyncPipe, TuiAmountPipe, TuiHint, TuiPieChart, TuiAxes, TuiBarChart],
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ChartComponent {
  protected readonly labels: string[] = [];  
  protected readonly value: number[] = [];
    
  protected readonly labelsX: string[] = [];
  protected readonly labelsY: string[] = [];
  protected max: number = 0;
  

  constructor(   
    private salesService: SaleService,      
  ) { }

  ngOnInit(): void {  
    this.loadEvents();     
  }    

  loadEvents(): void {
    this.salesService.getSales().subscribe(sales => {    
      sales.forEach(sale => {
        this.labels.push(sale.mes);
        this.value.push(sale.importe);
        
        this.labelsX.push(sale.mes);
      });
      // Encuentra el importe máximo
      const maxImporte = Math.max(...this.value);
      // Pongo 0 de inicio Y el mayor valor de 'value' como final de Y
      this.labelsY.push('0', maxImporte.toString());
      // ponemos el techo de la gráfica como el valor maximo de 'value'
      this.max = maxImporte      
    });
  }
}
