import EventDTO from './event-dto';
import FandomDTO from './fandom-dto';
import Fandom from './fandom';

interface UserDTO {
  _id?: string;
  username: string;
  fullName: string;
  email: string;
  country: string;
  city: string;
  bio: string;
  profileUrl: string;
  role: string;
  attendingEvents: EventDTO[];
  fandoms: Fandom[];
}

export default UserDTO;
