"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const test = () => __awaiter(this, void 0, void 0, function* () {
    const tsConfig = {
        type: 'postgres',
        database: 'typeorm-bug',
        entities: [
            // Try to load the model from source
            '**/*.model.ts',
        ],
    };
    try {
        yield typeorm_1.createConnection(tsConfig);
    }
    catch (error) {
        console.log('TS error', error);
    }
    const jsConfig = {
        type: 'postgres',
        database: 'typeorm-bug',
        entities: [
            // Try to load the model from compiled
            '**/*.model.js',
        ],
    };
    try {
        yield typeorm_1.createConnection(jsConfig);
    }
    catch (error) {
        console.log('JS error', error);
    }
});
test();
//# sourceMappingURL=index.js.map