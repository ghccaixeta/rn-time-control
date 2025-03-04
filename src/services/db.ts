import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import { ITimes } from 'src/context/times';

const tableName = 'times';

enablePromise(true);

export const getDBConnection = async () => {
    return openDatabase({ name: 'times.db', location: 'default' });
};

export const createTable = async (db: SQLiteDatabase) => {
    // create table if not exists
    const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        complete_name TEXT NOT NULL,
        minutes INTEGER NOT NULL,
        status TEXT NOT NULL,
        date TEXT NOT NULL,
        phone TEXT
    );`;

    await db.executeSql(query);
};

export const getTimes = async (db: SQLiteDatabase): Promise<ITimes[]> => {
    try {
        const todoItems: ITimes[] = [];
        const results = await db.executeSql(`SELECT rowid as id,complete_name as completeName, minutes, status, date, phone FROM ${tableName}`);
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

export const saveTimes = async (db: SQLiteDatabase, todoItems: ITimes) => {
    const insertQuery =
        `INSERT OR REPLACE INTO ${tableName}(complete_name,minutes,status,date,phone) values ('${todoItems.completeName}',${todoItems.minutes},'${todoItems.status}','${todoItems.date}','${todoItems.phone}')`

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
