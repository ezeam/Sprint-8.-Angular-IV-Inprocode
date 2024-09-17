import { AsyncPipe, isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, makeStateKey, OnInit, TransferState, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { TuiPieChart, TuiAxes, TuiBarChart } from '@taiga-ui/addon-charts';
import { TuiAmountPipe } from '@taiga-ui/addon-commerce';
import { TuiHint } from '@taiga-ui/core';
import { SaleService } from '../../services/sale.service';
import { tuiCeil } from '@taiga-ui/cdk';

const SALES_DATA_KEY = makeStateKey<any>('salesData');

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

  constructor(
    private salesService: SaleService,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.transferState.hasKey(SALES_DATA_KEY)) {
      const sales = this.transferState.get(SALES_DATA_KEY, []);
      this.loadSalesData(sales);
      this.transferState.remove(SALES_DATA_KEY);
      this.cdr.detectChanges();
    } else {
      this.loadEvents();
    }
  }

  loadEvents(): void {
    this.salesService.getSales().subscribe(sales => {
      if (isPlatformServer(this.platformId)) {
        this.transferState.set(SALES_DATA_KEY, sales);
      }
      this.loadSalesData(sales);
      this.cdr.detectChanges();
    });
  }

  loadSalesData(sales: any[]): void {
    sales.forEach(sale => {
      this.labels.push(sale.mes);
      this.value.push(sale.importe);        
      this.labelsX.push(sale.mes);
    });
    const maxImporte = Math.max(...this.value);
    this.labelsY.push('0', maxImporte.toString());
    this.max = maxImporte;
  }
}
