<<<<<<< HEAD:src/app/shared/models/user.model.ts
interface User {
=======
import FandomDTO from './fandom-dto';
import EventDTO from './event-dto';

interface UserDTO {
>>>>>>> af65f413551de5e189f3a5eb30e53185d6499dc7:src/app/shared/models/user-dto.ts
  username: string;
  fullName: string;
  email: string;
  country: string;
  city: string;
  bio: string;
  profileUrl: string;
  role: string;
<<<<<<< HEAD:src/app/shared/models/user.model.ts
=======
  attendingEvents: EventDTO[];
  fandoms: FandomDTO[];
>>>>>>> af65f413551de5e189f3a5eb30e53185d6499dc7:src/app/shared/models/user-dto.ts
}

export default UserDTO;
