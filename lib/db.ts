import postgres from 'postgres';

declare global {
  // eslint-disable-next-line no-var
  var _pg: postgres.Sql | undefined;
}

function createDb(): postgres.Sql {
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

function getDb(): postgres.Sql {
  if (process.env.NODE_ENV === 'production') {
    return createDb();
  }
  if (!global._pg) global._pg = createDb();
  return global._pg;
}

// Lazy proxy — db connection only created on first query, not at module load time
export const db: postgres.Sql = new Proxy({} as postgres.Sql, {
  get(_target, prop) {
    return getDb()[prop as keyof postgres.Sql];
  },
  apply(_target, _thisArg, args) {
    return (getDb() as unknown as (...a: unknown[]) => unknown)(...args);
  },
});

export default db;

export const sql: postgres.Sql = db;

export function from(table: string) {
  return {
    select: (cols = '*') => ({
      eq: (col: string, val: string | number | boolean | null) =>
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
      eq: (col: string, val: string | number | boolean | null) =>
        db`UPDATE ${db.unsafe(table)} SET ${db(data)} WHERE ${db.unsafe(col)} = ${val}`,
    }),
    delete: () => ({
      eq: (col: string, val: string | number | boolean | null) =>
        db`DELETE FROM ${db.unsafe(table)} WHERE ${db.unsafe(col)} = ${val}`,
    }),
  };
}
