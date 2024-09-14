import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SaleService } from '../../services/sale.service';
import { TuiBar } from '@taiga-ui/addon-charts';
import { TuiBarSet } from '@taiga-ui/addon-charts';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [ TuiBar, TuiBarSet ],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  salesData: any[] = [];
  chartData: any[] = [];
  isBrowser: boolean;
  

  constructor(
    private saleService: SaleService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.saleService.getSales().subscribe((sales) => {
        this.salesData = sales;
        this.formatChartData();
      });
    }
  }

  private formatChartData(): void {
    this.chartData = this.salesData.map(sale => ({
      name: sale.mes,
      value: sale.venta
    }));
  }
}
