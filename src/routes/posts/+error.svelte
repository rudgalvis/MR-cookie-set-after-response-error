<script>
    import { page } from '$app/stores';
</script>

<h1>{$page.error.message}</h1>

<a href="/auth">Login</a>