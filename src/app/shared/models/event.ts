import Fandom from "./fandom";
import Review from "./review";

interface Event {
  id?: number;
  fandomType: Fandom;
  name: string;
  description: string;
  postedBy: string;
  location: string;
  startDate: Date;
  endDate: Date;
  totalAttendance: number;
  reviews: Review[];
}

export default Event;
