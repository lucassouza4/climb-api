"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBoulderRoute = void 0;
const route_1 = require("../route");
class GetBoulderRoute {
    constructor(path, method, getBoulderService) {
        this.path = path;
        this.method = method;
        this.getBoulderService = getBoulderService;
    }
    static create(getBoulderService) {
        return new GetBoulderRoute("/boulders", route_1.httpMethod.GET, getBoulderService);
    }
    getHandler() {
        return (request, response) => __awaiter(this, void 0, void 0, function* () {
            const input = request.body;
            try {
                const output = yield this.getBoulderService.execute(input);
                const responseBody = this.present(output);
                response.status(200).json(responseBody).send();
            }
            catch (error) {
                response.status(404).send();
            }
        });
    }
    getPath() {
        return this.path;
    }
    getMethod() {
        return this.method;
    }
    present(input) {
        const response = {
            id: input.id,
            name: input.name,
            difficulty: input.difficulty,
            sector: input.sector,
            city: input.city,
            ascensions: input.ascensions,
        };
        return response;
    }
}
exports.GetBoulderRoute = GetBoulderRoute;
//# sourceMappingURL=get-boulder.express.route.js.map