import FandomDTO from './fandom-dto';
import EventDTO from './event-dto';

interface UserDTO {
  username: string;
  fullName: string;
  email: string;
  country: string;
  city: string;
  bio: string;
  profileUrl: string;
  role: string;
  attendingEvents: EventDTO[];
  fandoms: FandomDTO[];
}

export default UserDTO;
