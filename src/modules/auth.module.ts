import {Module} from "@nestjs/common";

import {AuthService} from "../services/auth.service";
import {AuthController} from "../controllers/auth.controller";
import * as module from "module";
import { AppController } from "../app.controller";

@Module({
  controllers: [AppController],
  providers: [AuthService]
})

export class AuthModules