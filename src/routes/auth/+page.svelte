<script lang="ts">
    import {goto} from "$app/navigation";
    import {log} from "$lib/log.ts";

    log('auth/+page.svelte init')

    export let data
    let {supabase} = data
    $: ({supabase} = data)


    log('auth/+page.svelte after data variables set')

    let email
    let password

    let afterSignup = false

    const handleSignUp = async () => {
        const {data, error} = await supabase.auth.signUp({
            email,
            password
        })

        if (error) {
            alert('some error. Check console.log')
            console.log(error)
            return
        }

        if (data) {
            alert('Signup success')

            afterSignup = true
        }
    }

    const handleSignIn = async () => {
        const {data, error} = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            alert('some error. Check console.log')
            console.log(error)
            return
        }

        if (data) {
            log('Marking logged in moment')
            alert('Login success')

            goto('/posts')
        }
    }

    const handleSignOut = async () => {
        const {data, error} = await supabase.auth.signOut()

        if (error) {
            alert('some error. Check console.log')
            console.log(error)
            return
        }

        alert('Logout success')
        goto('/')
    }
</script>

{#if !afterSignup}

    {#if !data.session}
        <p>Same form for signup & login. Make sure to click the correct action button.</p>

        <form on:submit="{handleSignUp}">
            <input name="email" bind:value="{email}" placeholder="Email"/>
            <input type="password" name="password" bind:value="{password}" placeholder="Password"/>
        </form>
    {/if}

    <div class="buttons">
        {#if data.session}
            <button on:click="{handleSignOut}">Sign Out</button>
        {:else}
            <button on:click="{handleSignUp}">Sign up</button>
            <button on:click="{handleSignIn}">Sign in</button>
        {/if}
    </div>

    <style>
        form,
        .buttons {
            max-width: 220px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-bottom: 24px;
        }

        .buttons {
            flex-direction: row;
        }

    </style>
{:else}
    <p>Confirm you email by going to ({email}) and clicking on the link in there.</p>
{/if}
