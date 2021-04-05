import Fandom from './fandom';

interface Event {
  _id?: number;
  fandomType: Fandom;
  name: string;
  description: string;
  postedBy: string;
  location: string;
  startDate: Date;
  endDate: Date;
  totalAttendance: number;
}

export default Event;
