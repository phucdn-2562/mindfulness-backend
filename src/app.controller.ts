import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { RedisService } from './shared/redis/redis.service';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly redisService: RedisService,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  async getHealth() {
    const mongoStatus = this.connection.readyState === 1;
    let redisStatus = false;
    try {
      await this.redisService.set('health-check', 'ok', 10);
      const redisVal = await this.redisService.get('health-check');
      redisStatus = redisVal === 'ok';
    } catch (e) {
      redisStatus = false;
    }

    return {
      status: 'ok',
      database: mongoStatus ? 'connected' : 'disconnected',
      redis: redisStatus ? 'connected' : 'disconnected',
    };
  }
}
