// Railway PostgreSQL connection via `postgres` package
// DATABASE_URL format: postgresql://user:pass@host:port/dbname

import postgres from 'postgres'

// Global singleton to avoid connection spam in dev (Next.js HMR)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalForDb = globalThis as unknown as { _pgClient?: any }

function getClient() {
  if (globalForDb._pgClient) return globalForDb._pgClient
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) throw new Error('DATABASE_URL environment variable is not set')
  const client = postgres(connectionString, {
    max: 10,
    idle_timeout: 30,
    connect_timeout: 10,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  })
  if (process.env.NODE_ENV !== 'production') globalForDb._pgClient = client
  return client
}

// Typed as any[] to avoid `unknown` field errors across 50+ pages.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sql: (strings: TemplateStringsArray, ...values: any[]) => Promise<any[]> = new Proxy(
  {} as any,
  {
    apply(_t, _th, args) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (getClient() as any)(...args)
    },
    get(_t, prop) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (getClient() as any)[prop]
    },
  }
)

// ─── QUERY HELPERS ───────────────────────────────────────────────────────────
// Mimics the Supabase .from() interface minimally for easy migration

type Row = Record<string, unknown>

interface SelectBuilder {
  eq(col: string, val: unknown): SelectBuilder
  neq(col: string, val: unknown): SelectBuilder
  order(col: string, opts?: { ascending?: boolean }): SelectBuilder
  limit(n: number): SelectBuilder
  single(): Promise<{ data: Row | null; error: unknown }>
  then(resolve: (v: { data: Row[]; error: unknown }) => void, reject?: (e: unknown) => void): void
}

interface InsertBuilder {
  select(cols?: string): InsertBuilder
  single(): Promise<{ data: Row | null; error: unknown }>
  then(resolve: (v: { data: Row[]; error: unknown }) => void, reject?: (e: unknown) => void): void
}

interface UpdateBuilder {
  eq(col: string, val: unknown): UpdateBuilder
  then(resolve: (v: { error: unknown }) => void, reject?: (e: unknown) => void): void
}

class QueryBuilder {
  private _table: string
  private _conditions: string[] = []
  private _values: unknown[] = []
  private _orderBy?: string
  private _orderAsc = true
  private _limitN?: number
  private _selectCols = '*'
  private _action: 'select' | 'insert' | 'update' | 'delete' = 'select'
  private _insertData?: Row
  private _updateData?: Row
  private _returnSingle = false
  private _returning = false

  constructor(table: string) {
    this._table = table
  }

  select(cols = '*'): SelectBuilder {
    this._action = 'select'
    this._selectCols = cols
    return this as unknown as SelectBuilder
  }

  insert(data: Row): InsertBuilder {
    this._action = 'insert'
    this._insertData = data
    return this as unknown as InsertBuilder
  }

  update(data: Row): UpdateBuilder {
    this._action = 'update'
    this._updateData = data
    return this as unknown as UpdateBuilder
  }

  eq(col: string, val: unknown): this {
    this._values.push(val)
    this._conditions.push(`"${col}" = $${this._values.length}`)
    return this
  }

  neq(col: string, val: unknown): this {
    this._values.push(val)
    this._conditions.push(`"${col}" != $${this._values.length}`)
    return this
  }

  not(col: string, _op: string, val: unknown): this {
    this._values.push(val)
    this._conditions.push(`"${col}" IS NOT NULL`)
    return this
  }

  order(col: string, opts?: { ascending?: boolean }): this {
    this._orderBy = col
    this._orderAsc = opts?.ascending ?? true
    return this
  }

  limit(n: number): this {
    this._limitN = n
    return this
  }

  single(): Promise<{ data: Row | null; error: unknown }> {
    this._returnSingle = true
    return this._execute() as Promise<{ data: Row | null; error: unknown }>
  }

  then(
    resolve: (v: { data: Row[] | Row | null; error: unknown }) => void,
    reject?: (e: unknown) => void
  ) {
    this._execute().then(resolve, reject)
  }

  private async _execute(): Promise<{ data: Row[] | Row | null; error: unknown }> {
    try {
      const where = this._conditions.length
        ? `WHERE ${this._conditions.join(' AND ')}`
        : ''
      const order = this._orderBy
        ? `ORDER BY "${this._orderBy}" ${this._orderAsc ? 'ASC' : 'DESC'}`
        : ''
      const limitClause = this._limitN ? `LIMIT ${this._limitN}` : ''

      let query: string

      if (this._action === 'select') {
        query = `SELECT ${this._selectCols} FROM "${this._table}" ${where} ${order} ${limitClause}`.trim()
      } else if (this._action === 'insert' && this._insertData) {
        const keys = Object.keys(this._insertData)
        const placeholders = keys.map((_, i) => `$${i + 1}`)
        const vals = keys.map(k => this._insertData![k])
        query = `INSERT INTO "${this._table}" (${keys.map(k => `"${k}"`).join(',')}) VALUES (${placeholders.join(',')}) RETURNING *`
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rows = await (sql as any).unsafe(query, vals)
        const data = this._returnSingle ? (rows[0] as Row ?? null) : (rows as Row[])
        return { data, error: null }
      } else if (this._action === 'update' && this._updateData) {
        const updateKeys = Object.keys(this._updateData)
        const updateVals = updateKeys.map(k => this._updateData![k])
        const allVals = [...updateVals, ...this._values]
        const setClauses = updateKeys.map((k, i) => `"${k}" = $${i + 1}`)
        const whereOffset = updateKeys.length
        const whereClause = this._conditions.length
          ? `WHERE ${this._conditions.map((c, i) => c.replace(/\$\d+/, `$${whereOffset + i + 1}`)).join(' AND ')}`
          : ''
        query = `UPDATE "${this._table}" SET ${setClauses.join(', ')} ${whereClause}`
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (sql as any).unsafe(query, allVals)
        return { data: null, error: null }
      } else {
        return { data: null, error: new Error('Unknown action') }
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rows = await (sql as any).unsafe(query, this._values)
      const data = this._returnSingle ? (rows[0] as Row ?? null) : (rows as Row[])
      return { data, error: null }
    } catch (err) {
      console.error(`[db] Query error on ${this._table}:`, err)
      return { data: null, error: err }
    }
  }
}

// Supabase-compatible `from()` shim — minimises page changes
export function from(table: string) {
  return new QueryBuilder(table)
}
