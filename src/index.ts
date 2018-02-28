import {
    createConnection
} from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const test = async () => {
    const tsConfig: PostgresConnectionOptions = {
        type:     'postgres',
        database: 'typeorm-bug',
        entities: [
            // Try to load the model from source
            '**/*.model.ts',
        ],
    };

    try {
        await createConnection(tsConfig);
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

    const jsConfig: PostgresConnectionOptions = {
        type:     'postgres',
        database: 'typeorm-bug',
        entities: [
            // Try to load the model from compiled
            '**/*.model.js',
        ],
    };

    try {
        await createConnection(jsConfig);
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
};

test();
