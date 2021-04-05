import FandomEvent from './fandom-event';
import PartialUserDTO from './partial-user-dto';

interface Event {
  _id?: string;
  fandom: FandomEvent;
  name: string;
  description: string;
  postedBy: PartialUserDTO;
  location: string;
  startDate: Date;
  endDate: Date;
  totalAttendance: number;
}

export default Event;
