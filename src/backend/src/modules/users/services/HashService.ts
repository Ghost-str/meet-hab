import { ConfigService } from '@nestjs/config';
import argon2 from 'argon2';
import { APP_KEY } from '../constants';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashService {

    private secret: Buffer;

    constructor(
        private configService: ConfigService,
    ) {
        this.secret = Buffer.from(this.configService.getOrThrow(APP_KEY))
    }


    async hash(password: string): Promise<string> {
     return argon2.hash(password, { 
        secret: this.secret
      })
    }
}

