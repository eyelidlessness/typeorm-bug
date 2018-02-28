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
        /*
        TS error /Users/gnosis/Projects/typeorm-bug/src/Foo.model.ts:1
        (function (exports, require, module, __filename, __dirname) { import {
                                                                    ^^^^^^

        SyntaxError: Unexpected token import
            at createScript (vm.js:80:10)
            at Object.runInThisContext (vm.js:139:10)
            at Module._compile (module.js:588:28)
            at Object.Module._extensions..js (module.js:635:10)
            at Module.load (module.js:545:32)
            at tryModuleLoad (module.js:508:12)
            at Function.Module._load (module.js:500:3)
            at Module.require (module.js:568:17)
            at require (internal/module.js:11:18)
            at Function.PlatformTools.load (/Users/gnosis/Projects/typeorm-bug/node_modules/typeorm/platform/PlatformTools.js:124:28)
        */
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
        /*
        JS error { DataTypeNotSupportedError: Data type "undefined" in "Foo.bar" is not supported by "postgres" database.
            at new DataTypeNotSupportedError (/Users/gnosis/Projects/typeorm-bug/node_modules/typeorm/error/DataTypeNotSupportedError.js:16:28)
            at /Users/gnosis/Projects/typeorm-bug/node_modules/typeorm/metadata-builder/EntityMetadataValidator.js:68:27
            at Array.forEach (<anonymous>)
            at EntityMetadataValidator.validate (/Users/gnosis/Projects/typeorm-bug/node_modules/typeorm/metadata-builder/EntityMetadataValidator.js:65:36)
            at /Users/gnosis/Projects/typeorm-bug/node_modules/typeorm/metadata-builder/EntityMetadataValidator.js:36:74
            at Array.forEach (<anonymous>)
            at EntityMetadataValidator.validateMany (/Users/gnosis/Projects/typeorm-bug/node_modules/typeorm/metadata-builder/EntityMetadataValidator.js:36:25)
            at Connection.buildMetadatas (/Users/gnosis/Projects/typeorm-bug/node_modules/typeorm/connection/Connection.js:503:33)
            at Connection.<anonymous> (/Users/gnosis/Projects/typeorm-bug/node_modules/typeorm/connection/Connection.js:157:30)
            at step (/Users/gnosis/Projects/typeorm-bug/node_modules/typeorm/connection/Connection.js:32:23)
        name: 'DataTypeNotSupportedError',
        message: 'Data type "undefined" in "Foo.bar" is not supported by "postgres" database.' }
        */
    }
    // Load the model directly...
    const directConfig = {
        type: 'postgres',
        database: 'typeorm-bug',
        entities: [
            require('./Foo.model').default,
        ],
    };
    try {
        yield typeorm_1.createConnection(directConfig);
    }
    catch (error) {
        console.log('Direct load error', error);
        /*
        Direct load error { DataTypeNotSupportedError: Data type "undefined" in "Foo.bar" is not supported by "postgres" database.
            at new DataTypeNotSupportedError (/Users/gnosis/Projects/typeorm-bug/node_modules/typeorm/error/DataTypeNotSupportedError.js:16:28)
            at /Users/gnosis/Projects/typeorm-bug/node_modules/typeorm/metadata-builder/EntityMetadataValidator.js:68:27
            at Array.forEach (<anonymous>)
            at EntityMetadataValidator.validate (/Users/gnosis/Projects/typeorm-bug/node_modules/typeorm/metadata-builder/EntityMetadataValidator.js:65:36)
            at /Users/gnosis/Projects/typeorm-bug/node_modules/typeorm/metadata-builder/EntityMetadataValidator.js:36:74
            at Array.forEach (<anonymous>)
            at EntityMetadataValidator.validateMany (/Users/gnosis/Projects/typeorm-bug/node_modules/typeorm/metadata-builder/EntityMetadataValidator.js:36:25)
            at Connection.buildMetadatas (/Users/gnosis/Projects/typeorm-bug/node_modules/typeorm/connection/Connection.js:503:33)
            at Connection.<anonymous> (/Users/gnosis/Projects/typeorm-bug/node_modules/typeorm/connection/Connection.js:157:30)
            at step (/Users/gnosis/Projects/typeorm-bug/node_modules/typeorm/connection/Connection.js:32:23)
        name: 'DataTypeNotSupportedError',
        message: 'Data type "undefined" in "Foo.bar" is not supported by "postgres" database.' }
        */
    }
});
test();
//# sourceMappingURL=index.js.map