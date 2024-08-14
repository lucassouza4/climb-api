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
exports.CreateBoulderUsecase = void 0;
const boulder_entity_1 = require("../../../domain/boulder/entity/boulder.entity");
class CreateBoulderUsecase {
    constructor(boulderGateway) {
        this.boulderGateway = boulderGateway;
    }
    static create(boulderGateway) {
        return new CreateBoulderUsecase(boulderGateway);
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, difficulty, sector, city, }) {
            const boulder = boulder_entity_1.Boulder.create(name, difficulty, sector, city); // REVISAR A CRIAÇÃO
            try {
                // primeiro deve buscar se existe no banco
                yield this.boulderGateway.save(boulder);
            }
            catch (error) {
                throw new Error("erro ao criar boulder");
            }
            const output = this.presentOutput(boulder);
            return output;
        });
    }
    presentOutput(boulder) {
        // MELHORAR OS PRESENTERS (camada)
        const output = {
            id: (boulder === null || boulder === void 0 ? void 0 : boulder.key) || "",
        };
        return output;
    }
}
exports.CreateBoulderUsecase = CreateBoulderUsecase;
//# sourceMappingURL=create-boulder.usecase.js.map