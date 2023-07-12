// src/hooks.server.ts
import {PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY} from '$env/static/public'
import {createSupabaseServerClient} from '@supabase/auth-helpers-sveltekit'
import type {Handle} from '@sveltejs/kit'
import {log} from "./lib/log";

export const handle: Handle = async ({event, resolve}) => {
    log('hooks.server.ts handle() first line')

    event.locals.supabase = createSupabaseServerClient({
        supabaseUrl: PUBLIC_SUPABASE_URL,
        supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
        event,
    })


    log('hooks.server.ts handle() after createSupabaseServerClient()')

    /**
     * a little helper that is written for convenience so that instead
     * of calling `const { data: { session } } = await supabase.auth.getSession()`
     * you just call this `await getSession()`
     */
    event.locals.getSession = async () => {
        const {
            data: {session},
        } = await event.locals.supabase.auth.getSession()
        return session
    }

    log('hooks.server.ts handle() after getSession()')

    return resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name === 'content-range'
        },
    })
}