import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { EventService } from '../../core/services/event.service';
import Event from '../../shared/models/event.model';

  
@Component({
    selector: 'event-create-dialog',
    templateUrl: './event-create.component.html',
    styleUrls: ['./event-create.component.sass']
})
export class EventCreateDialogComponent implements OnInit {

    range = new FormGroup({
        start: new FormControl(),
        end: new FormControl()
    });
    dateErrorMsg = "";

    eventName = "";
    nameErrorMsg = "";
    eventLocation = "";
    locationErrorMsg = "";
    description = "";
    descriptionErrorMsg = "";
    isDisabled = true;

    constructor(
        public dialogRef: MatDialogRef<EventCreateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {},
        private eventService: EventService
    ) {}

    ngOnInit(): void {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    submit(event: MouseEvent): void{
        let startDate = (this.range.value.start);
        let endDate = (this.range.value.end).toString();

        if (startDate !== null){
            startDate = startDate.toString();
        }

        if (endDate !== null){
            endDate = endDate.toString();
        }

        if (this.validateValues(this.eventName, this.eventLocation, this.description, startDate, endDate)){
            let event = {
                id: 4,
                fandomType: "shows",
                name: this.eventName,
                description: this.description,
                postedBy: "user1",
                location: this.eventLocation,
                startDate: this.getDate(startDate),
                endDate: this.getDate(endDate),
                totalAttendance: 2,
            }
        
            this.eventService.createEvent(event);
        } else {
            console.log(event);
            event.stopPropagation();
        }
    }

    validateValues(name: string, location: string, description: string, startDate: string, endDate: string): boolean{
        if (name.length <= 0) {
            this.nameErrorMsg = "Please enter an event name";
            return false;
        }

        if (location.length <= 0) {
            this.locationErrorMsg = "Please enter an event location";
            return false;
        }

        if (description.length <= 0) {
            this.descriptionErrorMsg = "Please include a description of the event";
            return false;
        }

        if (startDate.length <= 0 || endDate.length <= 0) {
            this.dateErrorMsg = "Please select the start and end dates";
            return false;
        }

        return true;
    }

    getDate(date: string): string{
        let values = date.split(' ');
        return values[1] + "/" + values[2] + "/" + values[3];
    }

}