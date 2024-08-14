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
exports.boulderRepositoryPrisma = void 0;
const boulder_entity_1 = require("../../../domain/boulder/entity/boulder.entity");
//implementar prisma model
class boulderRepositoryPrisma {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    static create(prismaClient) {
        return new boulderRepositoryPrisma(prismaClient);
    }
    save(boulder) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                key: boulder.key,
                name: boulder.name,
                difficulty: boulder.difficulty,
                sector: boulder.sector,
                city: boulder.city,
                ascensions: boulder.ascensions,
            };
            try {
                yield this.prismaClient.boulder.create({
                    data,
                });
            }
            catch (error) {
                throw new Error("Não foi possível salvar no banco");
            }
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const boulder = yield this.prismaClient.boulder.findUnique({
                    where: { key: key },
                });
                return boulder_entity_1.Boulder.with({
                    name: (boulder === null || boulder === void 0 ? void 0 : boulder.name) || "",
                    difficulty: (boulder === null || boulder === void 0 ? void 0 : boulder.difficulty) || 0,
                    sector: (boulder === null || boulder === void 0 ? void 0 : boulder.sector) || "",
                    city: (boulder === null || boulder === void 0 ? void 0 : boulder.city) || "",
                    key: (boulder === null || boulder === void 0 ? void 0 : boulder.key) || "",
                    ascensions: (boulder === null || boulder === void 0 ? void 0 : boulder.ascensions) || 0,
                });
            }
            catch (error) {
                throw new Error("Não foi possível buscar no banco");
            }
        });
    }
    getAll(name, city, sector) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error(`${name}, ${city}, ${sector}`);
        });
    }
    update(name, difficulty, sector, city) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error(`${name}, ${difficulty}, ${sector}, ${city}`);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error(`${id}`);
        });
    }
}
exports.boulderRepositoryPrisma = boulderRepositoryPrisma;
//# sourceMappingURL=boulder.repository.prisma.js.map