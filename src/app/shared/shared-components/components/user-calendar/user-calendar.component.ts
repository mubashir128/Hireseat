import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit, OnDestroy
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject, Subscription } from 'rxjs';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { ScheduleService } from 'src/app/_services/schedule.service';

declare var Materialize: any;
declare var jQuery: any;
import * as $ from 'jquery';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-user-calendar',
  templateUrl: './user-calendar.component.html',
  styleUrls: ['./user-calendar.component.css']
})
export class UserCalendarComponent implements OnInit, OnDestroy {

  createEventSubscription: Subscription;
  getAllEventSubscription: Subscription;
  editEventSubscription: Subscription;
  deleteEventSubscription: Subscription;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  activeDayIsOpen: boolean = true;
  editEvent: any = [];
  before: any;
  eventToBeDeleted: any = [];;


  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.eventToBeDeleted = event;
        // this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    // {
    //   start: subDays(startOfDay(new Date()), 1),
    //   end: addDays(new Date(), 1),
    //   title: 'A 3 day event',
    //   color: colors.red,
    //   actions: this.actions,
    //   allDay: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
    // {
    //   start: startOfDay(new Date()),
    //   title: 'An event with no end date',
    //   color: colors.yellow,
    //   actions: this.actions,
    // },
    // {
    //   start: subDays(endOfMonth(new Date()), 3),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: 'A long event that spans 2 months',
    //   color: colors.blue,
    //   allDay: true,
    // },
    // {
    //   start: addHours(startOfDay(new Date()), 2),
    //   end: addHours(new Date(), 2),
    //   title: 'A draggable and resizable event',
    //   color: colors.yellow,
    //   actions: this.actions,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
  ];


  constructor(
    private scheduleService: ScheduleService
  ) {
  }
  disabledDay(date) {
    // console.log(date); // <---**on this point date is undefined**
    // return (date.getDay() === 0 || date.getDay() === 3|| date.getDay() === 4|| date.getDay() === 5|| date.getDay() === 6);
  }
  ngOnInit() {
    jQuery('.modal').modal();
    this.getAllEvents();

  }
  getAllEvents() {
    this.getAllEventSubscription = this.scheduleService.getAllEvents().subscribe(async res => {
      if (res.length > 0) {
        // console.log('------------------------', res[0].schedules);
        let schedules = res[0].schedules;
        schedules.forEach(element => {
          if (element.start) element.start = new Date(element.start);
          if (element.end) element.end = new Date(element.end);
          element.actions = this.actions;

        });
        this.events = await schedules;
      }
    }, error => {
      console.log('-______-', error);

    });
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
    // console.log('day clicked', date, events, this.viewDate);

  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }



  addEvent(): void {
    const newNum = this.events.length + 1;
    const newEvent = {
      title: 'New event' + newNum,
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      actions: this.actions
    };
    const payload = {
      events: newEvent
    }
    this.createEventSubscription = this.scheduleService.createEvent(payload).subscribe(res => {
      // console.log('------------------', res);
      this.getAllEvents();
    }, error => {
      console.log(error);

    });
  }

  handleEvent(action: string, event: CalendarEvent): void {
    // console.log('------handle event--------', event);
    switch (action) {
      case 'Edited':
        this.editEvent = event;
        localStorage.setItem('beforeEdit', JSON.stringify(event));
        this.openEditModal();
        break;
      case 'Deleted':
        // console.log('hit delete');
        this.openDeleteModal();
        break;
      default:
        break;
    }

  }

  setView(view: CalendarView) {
    // console.log('setView', view);
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  saveEvent() {
    const beforeEdit = JSON.parse(localStorage.getItem('beforeEdit'));
    const payload = {
      beforeEdit: beforeEdit,
      afterEdit: this.editEvent
    }
    localStorage.removeItem('beforeEdit');
    // console.log('------------------------------------', payload);
    this.editEventSubscription = this.scheduleService.editEvent(payload).subscribe(res => {
      // console.log(res);

    }, error => {

    });
    this.closeEditModal();
  }
  openEditModal() {
    jQuery('#editModal').modal('open');
  }
  closeEditModal() {
    // console.log('closing edit modal');

    jQuery('#editModal').modal('close');
  }
  deleteEvent(eventToDelete: CalendarEvent) {
    // console.log('delete', eventToDelete);
    // this.events = this.events.filter((event) => event !== eventToDelete);
    this.eventToBeDeleted = eventToDelete;
    this.openDeleteModal();
    // console.log('delete', this.events);

  }
  confirmDeleteEvent() {
    try {
      this.deleteEventSubscription = this.scheduleService.deleteEvent(this.eventToBeDeleted).subscribe(res => {
        if (res) {
          // console.log(res);
          this.closeDeleteModal()
          this.getAllEvents();
        }
      }, err => {
        this.closeDeleteModal()
        this.getAllEvents();

      });
    } catch (error) {

    }

  }
  openDeleteModal() {
    jQuery('#deleteModal').modal('open');
  }
  closeDeleteModal() {
    jQuery('#deleteModal').modal('close');
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.createEventSubscription) {
      this.createEventSubscription.unsubscribe();
    }
    if (this.getAllEventSubscription) {
      this.getAllEventSubscription.unsubscribe();
    }
  }
}
