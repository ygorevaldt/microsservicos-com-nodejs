import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { PurchaseCreatedPayload } from "./types/purchase-created-payload.type";

@Controller()
export class PurchaseController {
  @EventPattern("purchase.created")
  async created(@Payload() payload: PurchaseCreatedPayload) {
    console.log("payload", payload);
  }
}
