import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { auth } from "express-oauth2-jwt-bearer";
import { ConfigService } from "@nestjs/config";
import { Request, Response } from "express";

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
    const { getRequest, getResponse } = context.switchToHttp();
    const request: Request = getRequest<Request>();
    const response: Response = getResponse<Response>();

    const jwtCheck = auth({
      audience: this.auth0Audience,
      issuerBaseURL: this.auth0Domain,
      tokenSigningAlg: this.algorithm,
    });

    return new Promise<boolean>((resolve, reject) => {
      jwtCheck(request, response, (error) => {
        if (error) {
          reject(new UnauthorizedException(error));
        } else {
          resolve(true);
        }
      });
    });
  }
}
