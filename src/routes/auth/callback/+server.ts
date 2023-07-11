import { redirect } from '@sveltejs/kit'

export const GET = async ({ url, locals: { supabase } }) => {
    const code = url.searchParams.get('code')

    console.log('esu cia')

    if (code) {
        await supabase.auth.exchangeCodeForSession(code)
    }

    throw redirect(303, '/posts')
}