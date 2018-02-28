import {
    createConnection,
    Connection,
} from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import FooModel from './Foo.model';

const test = async () => {
    let connection: Connection | null = null;

    console.log('__dirname', __dirname);
    // -> __dirname /Users/gnosis/Projects/typeorm-bug/dist
    // Note that `__dirname` already refers to `dist`.

    const distConfig: PostgresConnectionOptions = {
        type:     'postgres',
        database: 'typeorm-bug',
        entities: [
            // Try to load the model from compiled
            __dirname + '/**/*.model.js',
        ],
    };

    try {
        connection = await createConnection(distConfig);
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
            await connection.close();
        }
    }

    // Load the model directly...
    const directConfig: PostgresConnectionOptions = {
        type:     'postgres',
        database: 'typeorm-bug',
        entities: [
            FooModel,
        ],
    };

    try {
        connection = await createConnection(directConfig);
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
            await connection.close();
        }
    }
};

test();
