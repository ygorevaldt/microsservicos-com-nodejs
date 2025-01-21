import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: "classroom",
        brokers: ["localhost:29092"],
      },
    },
  });

  await app.startAllMicroservices();
  console.log("[Classroom] Microservice running");

  const port = process.env.PORT ?? 3334;
  await app.listen(process.env.PORT ?? 3334);
  console.log(`[Classroom] http server running on port ${port}`);
}
bootstrap();
