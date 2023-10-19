import { Injectable, NestMiddleware } from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";
import { SESSION_COOKIE_KEY } from "./constants";
import cookie from 'cookie';
import { IUser } from "./entities/user.entity";
import isEmpty from "lodash/isEmpty";
import { AuthService } from "./services/auth/auth.service";

const REG_EXP = /^Bearer\s+([a-zA-Z_0-9.-]+)$/gm

@Injectable()
export class UserMiddleware implements NestMiddleware {

    constructor(private readonly authService: AuthService) {}

   async use(req: FastifyRequest, res: FastifyReply, next: (error?: any) => void) {
       const user = await this.getUser(req);

       
        
       next();
    }

    async getUser(req: FastifyRequest) {

        const token = this.getToken(req);
        return this.authService.auth(token);
    }

    getToken(req: FastifyRequest):  string | undefined {
        const val = this.tryExtractFromAuthorization(req);

       if (val) {
        return val;
       }

       return this.tryExtractFromCookie(req);
    }


    tryExtractFromAuthorization(req: FastifyRequest): undefined | string {
           if (isEmpty(req.headers.authorization)) {
                return undefined;
           }

           const result =  REG_EXP.exec(req.headers.authorization!);

           if (isEmpty(result)) {
            return undefined;
           }

          return result![0]
    }


    tryExtractFromCookie(req: FastifyRequest): undefined | string {
        if (isEmpty(req.headers.cookie)) {
            return undefined;
        }

        try {
        const result = cookie.parse(req.headers.cookie!);
        const token = result[SESSION_COOKIE_KEY];

        if (isEmpty(token)) {
            return undefined;
        }

        return token;

        } finally {
            return undefined;
        }
    }
}