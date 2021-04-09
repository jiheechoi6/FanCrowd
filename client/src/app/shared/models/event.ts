import FandomEvent from './fandom-event';
import { IUserPostedBy } from './fandom-post';

interface Event {
  _id?: string;
  fandom: FandomEvent;
  name: string;
  description: string;
  postedBy?: IUserPostedBy;
  location: string;
  startDate: Date;
  endDate: Date;
  totalAttendance: number;
}

export default Event;
