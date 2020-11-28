import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

import * as serviceAccount from './config/siacquiz-firebase-adminsdk-dlf3z-3a9cf50a50.json';

@Injectable()
export class Init {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      databaseURL: 'https://siacquiz.firebaseio.com',
    });
  }
}
