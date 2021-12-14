import express from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import Controller from '@/utils/interfaces/controller.interface';
import ErrorMiddleware from '@/middleware/error.middleware';

class App {
  public express: express.Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.express = express();
    this.port = port;

    this.intialiseMiddleware();
    this.initialiseControllers(controllers);
    this.initialiseErrorHandling();

    // setup the database connection to mongodb
    const { MONGO_PATH } = process.env;
    mongoose.connect(MONGO_PATH || 'mongodb://localhost:27017');
  }

  /**
   * helmet for security
   * cors for resource sharing across different domains
   * morgan for simplying of logging HTTP requests
   * allows for parsing of json
   * compression will reduce downloaded data served to user by compressing
   */
  private intialiseMiddleware(): void {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(morgan('dev'));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
  }

  private initialiseControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.express.use('/api', controller.router);
    });
  }

  private initialiseErrorHandling(): void {
    this.express.use(ErrorMiddleware);
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`);
    });
  }
}

export default App;
