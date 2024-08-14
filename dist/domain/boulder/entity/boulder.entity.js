"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Boulder = void 0;
const crypto_1 = require("crypto");
class Boulder {
    constructor(props) {
        this.props = props;
        this.validade();
    }
    static create(name, difficulty, sector, city, key) {
        return new Boulder({
            key: key || (0, crypto_1.randomUUID)().toString(),
            name,
            difficulty,
            sector,
            city,
            ascensions: 0,
        });
    }
    validade() {
        if (this.props.name == null ||
            this.props.sector == null ||
            this.props.city == null) {
            throw new Error("name, sector e city precisam ser fornecidos");
        }
        if (this.props.difficulty < 0) {
            throw new Error("A difficulty do bulder deve ser maior ou igual a V0");
        }
    }
    static with(props) {
        return new Boulder(props);
    }
    get key() {
        return this.props.key;
    }
    get name() {
        return this.props.name;
    }
    get difficulty() {
        return this.props.difficulty;
    }
    get sector() {
        return this.props.sector;
    }
    get city() {
        return this.props.city;
    }
    get ascensions() {
        return this.props.ascensions;
    }
    increaseAscensions() {
        this.props.ascensions += 1;
    }
    decreaseAscensions() {
        this.props.ascensions -= 1;
    }
}
exports.Boulder = Boulder;
//# sourceMappingURL=boulder.entity.js.map