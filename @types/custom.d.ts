// custom.d.ts
import { UserInterface } from '../src/interfaces/userInterface'; // Adjust the path as necessary

declare module 'express' {
    interface Request {
      user?: UserInterface;
    }
  }