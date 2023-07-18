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
exports.CommonService = void 0;
const common_1 = require("@nestjs/common");
const localfile_repository_1 = require("../repository/localfile.repository");
const message_util_1 = require("../utils/message.util");
const util_1 = require("../utils/util");
let CommonService = exports.CommonService = class CommonService {
    constructor(localFilesRepository) {
        this.localFilesRepository = localFilesRepository;
    }
    async uploadFile(req, userId, files) {
        const localFileEntities = [];
        const baseURL = util_1.Util.getFullUrl(req);
        for (const file of files) {
            const newFile = await this.localFilesRepository.create({
                filename: file.originalname,
                path: baseURL + '/' + file.path,
                mimetype: file.mimetype,
                user_id: userId,
            });
            localFileEntities.push(await this.localFilesRepository.save(newFile));
        }
        return {
            result: localFileEntities,
            message: message_util_1.SUCCESSFUL,
        };
    }
};
exports.CommonService = CommonService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [localfile_repository_1.LocalFileRepository])
], CommonService);
//# sourceMappingURL=common.service.js.map