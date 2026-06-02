// Compatibility shim — Supabase replaced with Railway PostgreSQL + NextAuth
import { auth } from '@/lib/auth'
import { sql, from } from '@/lib/db'

export async function createClient() {
  const session = await auth()

  return {
    auth: {
      getUser: async () => ({
        data: {
          user: session?.user
            ? { id: session.user.id, email: session.user.email }
            : null,
        },
        error: null,
      }),
    },
    from,
    sql,
    getProfile: async (userId: string) => {
      const rows = await sql`SELECT * FROM profiles WHERE id = ${userId} LIMIT 1`
      return { data: rows[0] ?? null, error: null }
    },
  }
}
