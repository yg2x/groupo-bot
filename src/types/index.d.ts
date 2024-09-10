declare module '/config.json' {
    const token: string;
    const owners: string[];
    const prefix: string;
    export { token, owners, prefix };
}

declare module 'db.json' {
    interface Database {
        users: string[];
    }
    const db: Database;
    export default db;
}