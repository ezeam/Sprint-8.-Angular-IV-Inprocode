import { Component, OnInit, ChangeDetectionStrategy,  Inject, PLATFORM_ID } from '@angular/core';
import { TuiRoot } from '@taiga-ui/core';
import { TuiCalendarRange, tuiCreateDefaultDayRangePeriods } from '@taiga-ui/kit';
import { EventService } from '../../services/event.service';
import { Event } from '../../interfaces/event.interface';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [TuiRoot, TuiCalendarRange, FormsModule, CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit {
  protected items = tuiCreateDefaultDayRangePeriods();
  events: Event[] = [];
  isModalOpen = false;
  isEventsListOpen = false;
  newEvent: Event = { title: '', color: '', start: new Date(), end: new Date() };

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
    });
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.newEvent = { title: '', color: '', start: new Date(), end: new Date() };
  }

  createEvent(): void {
    if (this.newEvent.title && this.newEvent.color && this.newEvent.start && this.newEvent.end) {
      this.eventService.addEvent(this.newEvent).subscribe(() => {
        this.loadEvents();
      });
      this.closeModal();
    }
  }

  openEventsList(): void {
    this.isEventsListOpen = true;
  }

  closeEventsList(): void {
    this.isEventsListOpen = false;
  }

  deleteEvent(id?: number): void {
    if (id !== undefined) {
      this.eventService.deleteEvent(id).subscribe(() => {
        this.events = this.events.filter(event => event.id !== id);
      });
      this.closeEventsList();
    } else {
      console.error('No event ID provided');
    }
  }
}
