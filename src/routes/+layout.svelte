<script lang="ts">
    import { invalidate } from '$app/navigation'
    import { onMount } from 'svelte'
    import {log} from "../lib/log";

    export let data

    let { supabase, session } = data
    $: ({ supabase, session } = data)

    onMount(() => {
        log('+layout.svelte did onMount()')

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, _session) => {
            log('supabase.auth.onAuthStateChange fired')

            if (_session?.expires_at !== session?.expires_at) {
                invalidate('supabase:auth')
            }
        })

        return () => subscription.unsubscribe()
    });
</script>

<nav>
    Navigation:
    <a href="/">Root</a>
    <a href="/auth">Login <small>(also signup & logout)</small></a>
    <a href="/posts">Protected route</a>
</nav>

<style>
    nav {
        border: 1px solid black;
        padding: 24px;
        display: flex;
        gap: 8px;
        margin-bottom: 24px;
    }
</style>

<slot />