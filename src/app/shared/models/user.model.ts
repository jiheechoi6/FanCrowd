import EventDTO from './event.dto';

interface User {
  username: string;
  fullName: string;
  email: string;
  country: string;
  city: string;
  bio: string;
  profileUrl: string;
  role: string;
  attendingEvents: EventDTO[];
}

export default User;
