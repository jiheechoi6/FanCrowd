interface Event {
    id: number;
    fandomType: string;
    name: string;
    description: string;
    postedBy: string;
    location: string;
    startDate: string;
    endDate: string;
    totalAttendance: number; // Not including the person that created the event
}

export default Event;