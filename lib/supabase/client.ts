// Client-side compat shim — Supabase browser client replaced with NextAuth
// For client components use signIn/signOut from next-auth/react
export function createClient() {
  return {
    auth: {
      signInWithPassword: async () => ({ error: new Error('Use NextAuth signIn() instead') }),
      signOut: async () => ({ error: null }),
      getUser: async () => ({ data: { user: null }, error: null }),
    },
  }
}
