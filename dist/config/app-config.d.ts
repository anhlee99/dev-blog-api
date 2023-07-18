import { ConfigService } from '@nestjs/config';
export declare class AppConfig {
    static service: ConfigService;
    constructor(service: ConfigService);
    static get(key: string): any;
}
