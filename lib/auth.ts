import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import bcrypt from 'bcryptjs'
import { sql } from './db'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
      role: string
      clinicId?: string | null
    }
  }
  interface JWT {
    id: string
    role: string
    clinicId?: string | null
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email:    { label: 'Email',    type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const rows = await sql`
          SELECT u.id, u.email, u.name, u.image, u.password_hash,
                 p.role, p.first_name, p.last_name, p.clinic_id
          FROM users u
          LEFT JOIN profiles p ON p.id = u.id
          WHERE u.email = ${credentials.email as string}
          LIMIT 1
        `
        const user = rows[0]
        if (!user || !user.password_hash) return null

        const valid = await bcrypt.compare(
          credentials.password as string,
          user.password_hash as string
        )
        if (!valid) return null

        return {
          id:       user.id as string,
          email:    user.email as string,
          name:     user.name as string ?? `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim(),
          image:    user.image as string | null,
          role:     (user.role as string) ?? 'patient',
          clinicId: user.clinic_id as string | null,
        }
      },
    }),

    Google({
      clientId:     process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: { strategy: 'jwt' },

  callbacks: {
    async signIn({ user, account }) {
      // Google OAuth — upsert user in our DB
      if (account?.provider === 'google' && user.email) {
        const existing = await sql`SELECT id FROM users WHERE email = ${user.email} LIMIT 1`
        if (existing.length === 0) {
          const [newUser] = await sql`
            INSERT INTO users (email, name, image, email_verified)
            VALUES (${user.email}, ${user.name ?? null}, ${user.image ?? null}, NOW())
            RETURNING id
          `
          await sql`
            INSERT INTO profiles (id, role) VALUES (${newUser.id}, 'patient')
            ON CONFLICT (id) DO NOTHING
          `
        }
      }
      return true
    },

    async jwt({ token, user, account }) {
      if (user) {
        // First sign-in — load role from DB
        token.id = user.id!
        // @ts-expect-error extended user
        token.role = user.role ?? 'patient'
        // @ts-expect-error extended user
        token.clinicId = user.clinicId ?? null
      }
      if (account?.provider === 'google' && token.email) {
        // Fetch role for Google OAuth users
        const rows = await sql`
          SELECT p.role, p.clinic_id FROM profiles p
          JOIN users u ON u.id = p.id
          WHERE u.email = ${token.email}
          LIMIT 1
        `
        if (rows[0]) {
          token.role = rows[0].role as string
          token.clinicId = rows[0].clinic_id as string | null
        }
      }
      return token
    },

    async session({ session, token }) {
      session.user.id       = token.id as string
      session.user.role     = (token.role as string) ?? 'patient'
      session.user.clinicId = token.clinicId as string | null
      return session
    },
  },

  pages: {
    signIn:  '/login',
    signOut: '/login',
    error:   '/login',
  },

  secret: process.env.NEXTAUTH_SECRET,
})
