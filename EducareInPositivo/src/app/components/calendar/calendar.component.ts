import { NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';
import { TuiDay, TuiDayRange } from '@taiga-ui/cdk';
import { TuiLink, tuiDateFormatProvider } from '@taiga-ui/core';
import { TuiCalendarRange, TuiDayRangePeriod } from '@taiga-ui/kit';
import { TuiAsideItemDirective } from '@taiga-ui/layout';
import { TuiInputDateRangeModule } from '@taiga-ui/legacy';
import { EventService } from '../../services/event.service';
import { Event } from '../../interfaces/event.interface';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    exportAs: "CalendarComponent",
    imports: [
      NgIf, 
      TuiAsideItemDirective, 
      TuiCalendarRange, 
      TuiLink,
      FormsModule,
      ReactiveFormsModule,
      TuiInputDateRangeModule,
      CommonModule
    ],
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [tuiDateFormatProvider({mode: 'YMD', separator: '/'})],
})
export class CalendarComponent {
  protected readonly control = new FormControl();
  selectedDates?: { from: Date, to: Date };  
  isModalOpen = false;
  isEventsListOpen = false;  
  events: Event[] = [];
  newEvent: Event = { from: new Date, to: new Date };

  constructor(   
    private eventService: EventService, 
    private cdr: ChangeDetectorRef
  ) {    
    this.control.valueChanges.subscribe(value => { 
      if (value) {
        this.selectedDates = value;
      }
    });
  }

  items = [
    new TuiDayRangePeriod(
      new TuiDayRange(TuiDay.currentLocal().append({day: -30}), TuiDay.currentLocal()), 'Cargando fechas del servidor...',
    ),
  ];

  ngOnInit(): void {  
    this.loadEvents();     
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe(events => {    
      this.events = events;
      this.items = [];

      events.forEach((event, indx) => {          
        const toDate = new Date(event.to);
        const fromDate = new Date(event.from);
  
        const toDay = new TuiDay(toDate.getFullYear(), toDate.getMonth(), toDate.getDate());
        const fromDay = new TuiDay(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
        
        if (fromDay.daySameOrBefore(toDay)) {
          this.items.push(
            new TuiDayRangePeriod(
              new TuiDayRange(fromDay, toDay), `Fecha nº ${(indx + 1).toString() }`
            )
          );
        } else {
          console.error(`Error: fromDate (${fromDay}) is after toDate (${toDay}) for event ${indx}`);
        }

      });       
    });
  }
  
  createEvent(): void {
    if (this.selectedDates) {
      this.eventService.addEvent(this.selectedDates).subscribe(
        (newEvent) => {         
          this.events.push(newEvent);
          this.selectedDates = undefined; 
          this.control.reset();
          this.cdr.detectChanges(); 
          this.loadEvents();
          this.closeModal(); 
        },
        (error) => {
          console.error('Error creating event', error);
        }
      );
    }
  }

  deleteEvent(id?: number): void {
    if (id !== undefined) {
      this.eventService.deleteEvent(id).subscribe(() => {
          this.events = this.events.filter(event => event.id !== id);
          this.cdr.detectChanges();  
          this.loadEvents();
        },
        (error) => {
          console.error('Error deleting event', error);
        }
      );
    } else {
      console.error('No event ID provided');
    }
  }
  
  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  openEventsList(): void {
    this.isEventsListOpen = true;
  }

  closeEventsList(): void {
    this.isEventsListOpen = false;
  }

  protected selected: TuiDayRangePeriod | null = this.default;
  protected value: TuiDayRange | null = this.default.range;

  public get default(): TuiDayRangePeriod {
      return this.items[0]!;
  }

  public onValue(value: TuiDayRange | null): void {
      this.value = value;
  }   
}
