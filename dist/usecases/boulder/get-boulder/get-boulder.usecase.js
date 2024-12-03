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
exports.GetBoulderUsecase = void 0;
class GetBoulderUsecase {
    constructor(boulderGateway) {
        this.boulderGateway = boulderGateway;
    }
    static create(boulderGateway) {
        return new GetBoulderUsecase(boulderGateway);
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            let boulder;
            try {
                boulder = yield this.boulderGateway.get(input.id);
            }
            catch (error) {
                throw new Error("erro ao buscar boulder");
            }
            const output = this.presentOutput(boulder);
            return output;
        });
    }
    presentOutput(boulder) {
        const output = {
            id: (boulder === null || boulder === void 0 ? void 0 : boulder.key) || "",
            name: (boulder === null || boulder === void 0 ? void 0 : boulder.name) || "",
            difficulty: (boulder === null || boulder === void 0 ? void 0 : boulder.difficulty) || 0,
            sector: (boulder === null || boulder === void 0 ? void 0 : boulder.sector) || "",
            city: (boulder === null || boulder === void 0 ? void 0 : boulder.city) || "",
            ascensions: (boulder === null || boulder === void 0 ? void 0 : boulder.ascensions) || 0,
        };
        return output;
    }
}
exports.GetBoulderUsecase = GetBoulderUsecase;
//# sourceMappingURL=get-boulder.usecase.js.map