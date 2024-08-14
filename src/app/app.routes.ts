import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MapComponent} from './components/map/map.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ChartComponent } from './components/chart/chart.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'map', component: MapComponent},
  { path: 'calendar', component: CalendarComponent},
  { path: 'chart', component: ChartComponent},
  { path: '**', redirectTo: '/home' }
];
