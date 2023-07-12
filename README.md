# Minimal reproduction
#### Of a bug in Supabase SvelteKit Auth helper

It seems that the app crashes when user try to change the route
after their session has expired. App crashes throwing following error:

```
Error: Cannot use `cookies.set(...)` after the response has been generated
    at event.cookies.set (/home/korb/MR-cookie-set-after-response-error/node_modules/@sveltejs/kit/src/runtime/server/respond.js:493:11)
    at SvelteKitServerAuthStorageAdapter.setCookie (file:///home/korb/MR-cookie-set-after-response-error/node_modules/@supabase/auth-helpers-sveltekit/dist/index.js:80:24)
    at SvelteKitServerAuthStorageAdapter.setItem (/home/korb/MR-cookie-set-after-response-error/node_modules/@supabase/auth-helpers-shared/dist/index.js:276:10)
    at /home/korb/MR-cookie-set-after-response-error/node_modules/@supabase/gotrue-js/dist/main/lib/helpers.js:128:19
    at Generator.next (<anonymous>)
    at /home/korb/MR-cookie-set-after-response-error/node_modules/@supabase/gotrue-js/dist/main/lib/helpers.js:31:71
    at new Promise (<anonymous>)
    at __awaiter (/home/korb/MR-cookie-set-after-response-error/node_modules/@supabase/gotrue-js/dist/main/lib/helpers.js:27:12)
    at setItemAsync (/home/korb/MR-cookie-set-after-response-error/node_modules/@supabase/gotrue-js/dist/main/lib/helpers.js:127:46)
    at SupabaseAuthClient._persistSession (/home/korb/MR-cookie-set-after-response-error/node_modules/@supabase/gotrue-js/dist/main/GoTrueClient.js:1242:43)
node:internal/process/promises:288
            triggerUncaughtException(err, true /* fromPromise */);
            ^
            
Node.js v18.16.0

Process finished with exit code 1

```

## Setting Up the reproduction

### Step 1: Create a Supabase Project

### Step 2: Setup .env Keys

1. Rename `.env.example` to `.env` and replace values.
   Find these values in your Supabase project settings at `https://supabase.com/dashboard/project/_/settings/api`.

### Step 3: Configure Project Settings

In order to reproduce issues easily, follow these steps:

1. Make user sessions last only a few seconds:
   1. Go to Settings.
   2. Go to Auth.
   3. Set User Sessions to 15 seconds.

>*Note: Ensure that email confirmations are not disabled as this can cause errors.*

## Running the Project

### Step 4: Execute the Project

1. Use `npm install` to install all dependencies.
2. Run the project using `npm run dev`.
3. Open `http://localhost:5173` in your browser.

## Reproduce the Problem

### Step 5: Identify the Problem

The application crashes when a user, who is logged in, navigates from `/posts` (a protected route) to `/auth` (login route) via the navigation button.

Below are steps to reproduce this issue:

1. Create an account:
   1. Navigate to /auth, fill in the form, and click the sign up button.
   2. Check your email and confirm the account creation via the email link.
   3. At this point, you should be logged in.
2. Click on _Protected route_ in the top navigation.
3. Click on _Login_ in the top navigation.
4. The application should crash.

> If the application does not crash, rerun the program using `npm run dev`. Log in again and repeat the steps. The crash should occur consistently.