import FandomEvent from './fandom-event';
import PartialUserProfileDTO from './partial-user-dto';

interface Event {
  _id?: string;
  fandom: FandomEvent;
  name: string;
  description: string;
  postedBy: PartialUserProfileDTO;
  location: string;
  startDate: Date;
  endDate: Date;
  totalAttendance: number;
}

export default Event;
