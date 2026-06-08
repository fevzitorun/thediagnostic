import postgres from 'postgres';

declare global {
  // eslint-disable-next-line no-var
  var _pg: postgres.Sql | undefined;
}

function createDb() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  return postgres(connectionString, {
    max: 10,
    idle_timeout: 20,
    connect_timeout: 10,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });
}

export const db: postgres.Sql =
  process.env.NODE_ENV === 'production'
    ? createDb()
    : (global._pg ?? (global._pg = createDb()));

export default db;

export const sql: postgres.Sql = db;

export function from(table: string) {
  return {
    select: (cols = '*') => ({
      eq: (col: string, val: unknown) =>
        db`SELECT ${db.unsafe(cols)} FROM ${db.unsafe(table)} WHERE ${db.unsafe(col)} = ${val}`,
      order: (col: string, { ascending = true } = {}) =>
        db`SELECT ${db.unsafe(cols)} FROM ${db.unsafe(table)} ORDER BY ${db.unsafe(col)} ${db.unsafe(ascending ? 'ASC' : 'DESC')}`,
      limit: (n: number) =>
        db`SELECT ${db.unsafe(cols)} FROM ${db.unsafe(table)} LIMIT ${n}`,
    }),
    insert: (rows: Record<string, unknown> | Record<string, unknown>[]) => {
      const arr = Array.isArray(rows) ? rows : [rows];
      return db`INSERT INTO ${db.unsafe(table)} ${db(arr)}`;
    },
    update: (data: Record<string, unknown>) => ({
      eq: (col: string, val: unknown) =>
        db`UPDATE ${db.unsafe(table)} SET ${db(data)} WHERE ${db.unsafe(col)} = ${val}`,
    }),
    delete: () => ({
      eq: (col: string, val: unknown) =>
        db`DELETE FROM ${db.unsafe(table)} WHERE ${db.unsafe(col)} = ${val}`,
    }),
  };
}
