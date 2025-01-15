import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthorizationGuard } from "../authorization/authorization.guard";

@Controller("test")
export class TestController {
  @Get("ok")
  @UseGuards(AuthorizationGuard)
  ok() {
    return { message: "ok" };
  }
}
