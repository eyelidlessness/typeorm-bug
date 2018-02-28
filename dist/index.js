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
const Foo_model_1 = require("./Foo.model");
const test = () => __awaiter(this, void 0, void 0, function* () {
    let connection = null;
    console.log('__dirname', __dirname);
    // -> __dirname /Users/gnosis/Projects/typeorm-bug/dist
    // Note that `__dirname` already refers to `dist`.
    const distConfig = {
        type: 'postgres',
        database: 'typeorm-bug',
        entities: [
            // Try to load the model from compiled
            __dirname + '/**/*.model.js',
        ],
    };
    try {
        connection = yield typeorm_1.createConnection(distConfig);
    }
    catch (error) {
        console.log('Dist glob error', error);
        /*
        Dist glob error { DataTypeNotSupportedError: Data type "undefined" in "Foo.bar" is not supported by "postgres" database.
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
    finally {
        if (connection) {
            yield connection.close();
        }
    }
    // Load the model directly...
    const directConfig = {
        type: 'postgres',
        database: 'typeorm-bug',
        entities: [
            Foo_model_1.default,
        ],
    };
    try {
        connection = yield typeorm_1.createConnection(directConfig);
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
    finally {
        if (connection) {
            yield connection.close();
        }
    }
});
test();
//# sourceMappingURL=index.js.map