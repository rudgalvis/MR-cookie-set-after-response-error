## #1. Create as supabase project

## #2. Get the the .env keys

Put them in the .env file in the root of the project

```
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

*Find these in your Supabase project settings* https://supabase.com/dashboard/project/_/settings/api

## #3. Set Supabase project up

For easy issue reproduction you need to:

1. Disable email confirmation
   1. Go to Authentication
   2. Go to Providers
   3. Under Email disable _"Confirm email"_
2. Make user sessions last few seconds only to reproduce the issue quickly
   1. Go to Settings 
   2. Go to Auth 
   3. Set User Sessions: 15

## #2. Run the project

1. `npm install`
2. `npm run dev`
3. Open `http://localhost:5173` in your browser
4. 