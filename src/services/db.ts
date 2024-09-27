import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';

interface ITimes {
    value: string;
    // completeName: string;
    // minutes: number;
    // isActive: boolean;
    // date?: string;
}

const tableName = 'times';

enablePromise(true);

export const getDBConnection = async () => {
    return openDatabase({ name: 'times.db', location: 'default' });
};

export const createTable = async (db: SQLiteDatabase) => {
    // create table if not exists
    const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        value TEXT NOT NULL
    );`;

    await db.executeSql(query);
};

export const getTodoItems = async (db: SQLiteDatabase): Promise<ITimes[]> => {
    try {
        const todoItems: ITimes[] = [];
        const results = await db.executeSql(`SELECT rowid as id,value FROM ${tableName}`);
        results.forEach(result => {
            for (let index = 0; index < result.rows.length; index++) {
                todoItems.push(result.rows.item(index))
            }
        });
        return todoItems;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get todoItems !!!');
    }
};

export const saveTodoItems = async (db: SQLiteDatabase, todoItems: ITimes) => {
    const insertQuery =
        `INSERT OR REPLACE INTO ${tableName}(value) values ('${todoItems.value}')`

    return db.executeSql(insertQuery);
};

export const deleteTodoItem = async (db: SQLiteDatabase, id: number) => {
    const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
    await db.executeSql(deleteQuery);
};

export const deleteTable = async (db: SQLiteDatabase) => {
    const query = `drop table ${tableName}`;

    await db.executeSql(query);
};