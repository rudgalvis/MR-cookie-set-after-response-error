<script lang="ts">
    export let data
</script>

{#if data.session}
    <h4>Supabase and SvelteKit Auth Integration Issue</h4>

    <p>An issue has emerged while using SvelteKit auth helper with Supabase, as per their <a href="https://supabase.com/docs/guides/auth/auth-helpers/sveltekit">documentation</a>. Despite adhering to the guidelines, an unexpected error keeps appearing.</p>

    <p>Post login, we do receive session data, such as <small><i>data.session.user.email</i>: {data.session.user.email}</small>.</p>

    <p>But here's the problem: if you refresh the page post-expiry, the app crashes. This leads to a full restart, causing significant downtime. The larger the user base, the more severe the impact of this issue.</p>

    <p><i>Hopefully you've set it to a few seconds User Session in Supabase -> Settings -> Auth, so you could refresh the page after reading this and crash the app.</i></p>
{/if}