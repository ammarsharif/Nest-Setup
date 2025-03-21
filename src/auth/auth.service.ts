import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase_config';
import { BrevoTemplates, BrevoUtils } from '../utils/brevo';

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
      await this.sendVerificationEmail(userRecord.uid);
      return {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        Email: 'Please verify your email',
      };
    } catch (error: any) {
      throw new UnauthorizedException(error.message);
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (!user.user.emailVerified) {
        throw new UnauthorizedException('Email is not verified');
      }
      const token = await user.user.getIdToken();
      return { token };
    } catch (error: any) {
      throw new UnauthorizedException(error.message);
    }
  }

  async sendVerificationEmail(uid: string) {
    try {
      const user = await this.firebaseService.getAuth().getUser(uid);
      if (user.emailVerified) {
        throw new UnauthorizedException('Email is already verified');
      }
      const verification_url = await this.firebaseService
        .getAuth()
        .generateEmailVerificationLink(user.email ?? '');
      const emailSent = await BrevoUtils.send(
        BrevoTemplates.AccountVerificationTemplate,
        {
          name: user.email,
          verification_url,
        },
        user.email ?? '',
      );
      if (emailSent) {
        return { message: 'Verification email sent to ' + user.email };
      } else {
        throw new UnauthorizedException('Failed to send verification email');
      }
    } catch (error: any) {
      throw new UnauthorizedException(error.message);
    }
  }

  async resendVerificationEmail(email: string) {
    try {
      const user = await this.firebaseService.getAuth().getUserByEmail(email);
      if (user.emailVerified) {
        throw new UnauthorizedException('Email is already verified');
      }
      const verification_url = await this.firebaseService
        .getAuth()
        .generateEmailVerificationLink(email);
      const emailSent = await BrevoUtils.send(
        BrevoTemplates.AccountVerification,
        {
          name: user.email,
          verification_url,
        },
        user.email ?? '',
      );
      if (emailSent) {
        return { message: 'Verification email sent to ' + user.email };
      } else {
        throw new UnauthorizedException('Failed to send verification email');
      }
      return { message: 'Verification email resent' };
    } catch (error: any) {
      throw new UnauthorizedException(error.message);
    }
  }
}
