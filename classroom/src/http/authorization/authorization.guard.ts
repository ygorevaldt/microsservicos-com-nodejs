import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { auth } from "express-oauth2-jwt-bearer";
import { ConfigService } from "@nestjs/config";
import { GqlExecutionContext } from "@nestjs/graphql";
import * as jwt from "jsonwebtoken";
import { Request } from "express";

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private auth0Audience: string;
  private auth0Domain: string;
  private algorithm: string;

  constructor(private readonly configService: ConfigService) {
    this.auth0Audience = this.configService.get<string>("AUTH0_AUDIENCE") ?? "";
    this.auth0Domain = this.configService.get<string>("AUTH0_DOMAIN") ?? "";
    this.algorithm = this.configService.get<string>("AUTH0_ALGORITHM");
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { req, res } = GqlExecutionContext.create(context).getContext();

    const jwtCheck = auth({
      audience: this.auth0Audience,
      issuerBaseURL: this.auth0Domain,
      tokenSigningAlg: this.algorithm,
    });

    return new Promise<boolean>((resolve, reject) => {
      jwtCheck(req, res, (error) => {
        if (error) {
          reject(new UnauthorizedException(error));
        } else {
          req.user = this.extractPayloadFromToken(req);
          resolve(true);
        }
      });
    });
  }

  private extractPayloadFromToken(req: Request) {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.decode(token);
    return payload;
  }
}
