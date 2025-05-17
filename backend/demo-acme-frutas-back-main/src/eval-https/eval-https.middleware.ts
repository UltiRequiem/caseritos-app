import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { ConfigEnvVars } from 'src/configs';

@Injectable()
export class EvalHttpsMiddleware implements NestMiddleware {
  constructor(
    private configService: ConfigService<ConfigEnvVars, true>
  ) {}
  use(req: ForceProtocolHttps<Request>, res: any, next: () => void) {
    if (this.configService.get("FORCE_HTTPS")) {
      req.force_protocol_https = true;
    }
    next();
  }
}
