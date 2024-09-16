import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit  } from '@angular/core';
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

export class ChartComponent implements OnInit {
  labels: string[] = [];  
  value: number[] = [];
  labelsX: string[] = [];
  labelsY: string[] = [];
  max: number = 0;

  constructor(private salesService: SaleService) {}

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
      const maxImporte = Math.max(...this.value);
      this.labelsY.push('0', maxImporte.toString());
      this.max = maxImporte;
    });
  }
}
