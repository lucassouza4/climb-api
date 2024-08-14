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
exports.CreateBoulderRoute = void 0;
const route_1 = require("../route");
class CreateBoulderRoute {
    constructor(path, method, createBoulderService) {
        this.path = path;
        this.method = method;
        this.createBoulderService = createBoulderService;
    }
    static create(createBoulderService) {
        return new CreateBoulderRoute("/boulders", route_1.httpMethod.POST, createBoulderService);
    }
    getHandler() {
        return (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { name, difficulty, sector, city } = request.body;
            const input = {
                name,
                difficulty,
                sector,
                city,
            };
            try {
                const output = yield this.createBoulderService.execute(input);
                const responseBody = this.present(output);
                response.status(201).json(responseBody).send();
            }
            catch (error) {
                response.status(400).send();
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
        const response = { id: input.id };
        return response;
    }
}
exports.CreateBoulderRoute = CreateBoulderRoute;
//# sourceMappingURL=create-boulder.express.route.js.map