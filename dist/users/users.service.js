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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entitys/user.entity");
const typeorm_2 = require("typeorm");
const account_entity_1 = require("../entitys/account.entity");
const message_util_1 = require("../utils/message.util");
const user_repository_1 = require("../repository/user.repository");
const account_repository_1 = require("../repository/account.repository");
let UsersService = exports.UsersService = class UsersService {
    constructor(dataSource, userRepository, accountRepository) {
        this.dataSource = dataSource;
        this.userRepository = userRepository;
        this.accountRepository = accountRepository;
    }
    async register(registerDto) {
        let accountEntity = await this.accountRepository.findOne({
            where: { login_name: registerDto.login_name },
        });
        if (accountEntity != null) {
            return {
                code: common_1.HttpStatus.BAD_REQUEST,
                message: message_util_1.LOGIN_NAME_EXIST,
            };
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            accountEntity = new account_entity_1.AccountEntity();
            accountEntity.account_type = 0;
            accountEntity.login_name = registerDto.login_name;
            accountEntity.password = registerDto.password;
            await queryRunner.manager.save(accountEntity);
            const userEntity = new user_entity_1.UserEntity();
            userEntity.account_id = accountEntity.id;
            userEntity.email = registerDto.login_name;
            await queryRunner.manager.save(userEntity);
            accountEntity.user_id = userEntity.id;
            await queryRunner.manager.save(accountEntity);
            await queryRunner.commitTransaction();
            return {
                code: common_1.HttpStatus.CREATED,
                message: message_util_1.SUCCESSFUL,
            };
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            return {
                code: common_1.HttpStatus.BAD_REQUEST,
                message: message_util_1.FAILURE,
            };
        }
        finally {
            await queryRunner.release();
        }
    }
    async getProfile(userId) {
        const userEntity = await this.userRepository.findOne({
            where: { id: userId },
        });
        return {
            result: userEntity,
        };
    }
    async updateProfile(userId, updateUserDto) {
        const userEntity = await this.userRepository.findOne({
            where: { id: userId },
        });
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            userEntity.fullname = updateUserDto.fullname || userEntity.fullname;
            userEntity.address = updateUserDto.address || userEntity.address;
            userEntity.bio = updateUserDto.bio || userEntity.bio;
            userEntity.email = updateUserDto.email || userEntity.email;
            userEntity.facebook = updateUserDto.facebook || userEntity.facebook;
            userEntity.user_setting_data = updateUserDto.user_setting_data || userEntity.user_setting_data;
            await queryRunner.manager.save(userEntity);
            await queryRunner.commitTransaction();
            return {
                code: common_1.HttpStatus.OK,
                message: message_util_1.SUCCESSFUL,
                result: userEntity,
            };
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            return {
                code: common_1.HttpStatus.BAD_REQUEST,
                message: message_util_1.FAILURE,
            };
        }
        finally {
            await queryRunner.release();
        }
    }
    async findAccountByLoginName(username) {
        return this.accountRepository.findOne({
            where: { login_name: username },
        });
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        user_repository_1.UserRepository,
        account_repository_1.AccountRepository])
], UsersService);
//# sourceMappingURL=users.service.js.map