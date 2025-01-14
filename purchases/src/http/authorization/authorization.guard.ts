import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { auth } from "express-oauth2-jwt-bearer";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private auth0Audience: string;
  private auth0Domain: string;
  private algorithm: string;

  constructor(private readonly configService: ConfigService) {
    this.auth0Audience = this.configService.get("AUTH0_AUDIENCE") ?? "";
    this.auth0Domain = this.configService.get("AUTH0_DOMAIN") ?? "";
    this.algorithm = this.configService.get("AUTH0_ALGORITHM");
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { getRequest, getResponse, getNext } = context.switchToHttp();
    const request = getRequest();
    const response = getResponse();
    const next = getNext();

    const jwtCheck = auth({
      audience: this.auth0Audience,
      issuerBaseURL: this.auth0Domain,
      tokenSigningAlg: this.algorithm,
    });

    try {
      await jwtCheck(request, response, next);
      return true;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
