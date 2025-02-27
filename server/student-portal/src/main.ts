import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType, Logger } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exception.filter';


const PORT = parseInt(process.env.PORT!, 10) || 4000;

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    {
    logger: ['warn', 'error', 'debug', 'log']
    });
  
      // register all plugins and extension
    app.enableCors({ origin: '*' });
  // app.useGlobalPipes(new ValidationPipe({}));
    app.useGlobalFilters(new HttpExceptionFilter());  
    app.enableVersioning({ type: VersioningType.URI });
    app.use(helmet());


   await app.listen(PORT, () => {
        Logger.log(`🚀 Application running at port ${PORT} `);
    });
}
 
bootstrap();
