import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase_config';

@Injectable()
export class AuthService {
  constructor(private firebaseService: FirebaseService) {}

  async verifyToken(idToken: string) {
    try {
      const decodedToken = await this.firebaseService
        .getAuth()
        .verifyIdToken(idToken);
      return decodedToken;
    } catch (error: any) {
      throw new UnauthorizedException('Invalid or expired Firebase token');
    }
  }

  async register(email: string, password: string, displayName: string) {
    try {
      const userRecord = await this.firebaseService.getAuth().createUser({
        email,
        password,
        displayName,
      });
      return {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
      };
    } catch (error: any) {
      throw new UnauthorizedException(error.message);
    }
  }

  async login(email: string, password: string) {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response;
  }
}
