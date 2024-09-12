import { Component, OnInit, ChangeDetectionStrategy,  Inject, PLATFORM_ID } from '@angular/core';
import { TuiRoot } from '@taiga-ui/core';
import { TuiCalendarRange, tuiCreateDefaultDayRangePeriods } from '@taiga-ui/kit';
import { EventService } from '../../services/event.service';
import { Event } from '../../interfaces/event.interface';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [TuiRoot, TuiCalendarRange],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit {
  protected items = tuiCreateDefaultDayRangePeriods();
  events: Event[] = [];

  constructor(
    private eventService: EventService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadEvents();
    }
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
      // Aquí puedes actualizar tu vista con los eventos
    });
  }
}
