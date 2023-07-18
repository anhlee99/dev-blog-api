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
exports.CommonController = void 0;
const common_1 = require("@nestjs/common");
const common_service_1 = require("./common.service");
const auth_guard_1 = require("../auth/guard/auth.guard");
const localfile_web_interceptor_1 = require("../config/web/interceptor/localfile.web.interceptor");
const parse_file_pipe_1 = require("./pipe/parse-file.pipe");
const transform_web_interceptor_1 = require("../config/web/interceptor/transform.web.interceptor");
const config_1 = require("@nestjs/config");
const constants_ultis_1 = require("../utils/constants.ultis");
let CommonController = exports.CommonController = class CommonController {
    constructor(configService, commonService) {
        this.configService = configService;
        this.commonService = commonService;
    }
    uploadFile(req, files) {
        return this.commonService.uploadFile(req, req.user.user_id, files);
    }
    uploadFiles(files) {
        console.log(files);
    }
};
__decorate([
    (0, common_1.Post)('upload-image'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)(transform_web_interceptor_1.TransformWebInterceptor),
    (0, common_1.UseInterceptors)((0, localfile_web_interceptor_1.default)({
        fieldName: 'images',
        path: '/images',
        fileFilter: (request, files, callback) => {
            if (!files.mimetype.includes('image')) {
                return callback(new common_1.BadRequestException('Provide a valid image'), false);
            }
            callback(null, true);
        },
        limits: {
            fileSize: Math.pow(constants_ultis_1.UPLOADED_FILES_FILE_LIMIT_SIZE, 2),
        },
    })),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.UploadedFiles)(parse_file_pipe_1.ParseFile)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", void 0)
], CommonController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('uploads'),
    __param(0, (0, common_1.UploadedFiles)(parse_file_pipe_1.ParseFile)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], CommonController.prototype, "uploadFiles", null);
exports.CommonController = CommonController = __decorate([
    (0, common_1.Controller)('common'),
    __metadata("design:paramtypes", [config_1.ConfigService,
        common_service_1.CommonService])
], CommonController);
//# sourceMappingURL=common.controller.js.map