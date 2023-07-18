"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = void 0;
class Util {
    static getFullUrl(req) {
        return `${req.protocol}://${req.get('Host')}`;
    }
}
exports.Util = Util;
//# sourceMappingURL=util.js.map