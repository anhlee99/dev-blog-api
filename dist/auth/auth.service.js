"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_repository_1 = require("../repository/user.repository");
const account_repository_1 = require("../repository/account.repository");
let AuthService = exports.AuthService = class AuthService {
    constructor(accountRepository, userRepository, jwtService) {
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async signIn(login_name, pass) {
        const accountEntity = await this.accountRepository.findOne({
            where: { login_name: login_name },
        });
        if (accountEntity?.password !== pass) {
            throw new common_1.UnauthorizedException();
        }
        const userEntity = await this.userRepository.findOne({
            where: { id: accountEntity.user_id },
        });
        const payload = {
            account_id: accountEntity.id,
            login_name: accountEntity.login_name,
            user_id: userEntity.id,
            email: userEntity.email,
            fullname: userEntity.fullname,
            shortname: userEntity.shortname,
        };
        return {
            result: {
                username: login_name,
                access_token: await this.jwtService.signAsync(payload),
            },
        };
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [account_repository_1.AccountRepository,
        user_repository_1.UserRepository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map