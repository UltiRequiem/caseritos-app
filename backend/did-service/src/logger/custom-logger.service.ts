import { LoggerService } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Inject } from '@nestjs/common';

@Injectable()
export class CustomLoggerService implements LoggerService {
  private context?: string;

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly winstonLogger: Logger,
  ) {}

  setContext(context: string) {
    this.context = context;
    return this;
  }

  log(message: any, context?: string) {
    context = context || this.context;
    this.winstonLogger.info(message, { context });
  }

  error(message: any, trace?: string, context?: string) {
    context = context || this.context;
    this.winstonLogger.error(message, { context, trace });
  }

  warn(message: any, context?: string) {
    context = context || this.context;
    this.winstonLogger.warn(message, { context });
  }

  debug(message: any, context?: string) {
    context = context || this.context;
    this.winstonLogger.debug(message, { context });
  }

  verbose(message: any, context?: string) {
    context = context || this.context;
    this.winstonLogger.verbose(message, { context });
  }
}