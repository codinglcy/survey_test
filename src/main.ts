import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app
    .listen(process.env.PORT, () => {
      console.log('server starting on port.... ', process.env.PORT);
    })
    .then(() =>
      console.log('success to start server on port ', process.env.PORT),
    )
    .catch((error) => {
      console.log('failed to start server because....\n', error);
    });
}
bootstrap();
