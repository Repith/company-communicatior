
# Company Communicator



Company's custom communication platform, designed to facilitate seamless and direct interaction among team members


## Features

 - modeled after the popular Discord application, allows for the creation of dedicated channels and conversations
 - enables real-time communication through shared messages, private messages, as well as voice and video channels
 - privite channels and invitation links
 - functionalities for admin and moderators


## Tech Stack

**Client:** React, Next.js, TailwindCSS, shadcn/ui

**Server:** Prisma (Supabase)

**Other:** Clerk, Livekit, Uploadthing

## Demo

Try here: https://company-communicatior-production.up.railway.app


## Installation

First use your packet manager to install dependencies (f.e. npm)

```bash 
  npm install
```
Populate your database and run server:

```bash
npx prisma generate
npx prisma db push
npm run dev
```
Your errors from Prisma should be solved, and database connected.

Open your browser and by default server should run on http://localhost:3000.

Configure your **.env** file with your own keys from Clerk, MongoDB and Uploadthing.

```bash
# Environment Variables
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Supabase database connection
DATABASE_URL=

# Uploadthing API for file uploads
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

# Livekit API for video calls
LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
NEXT_PUBLIC_LIVEKIT_URL=
```

Create your own channel and invite people to join it! 


## Screenshots

![Main](https://github.com/Repith/Repith/blob/main/public/Communicator/main.png)
![functionalities](https://github.com/Repith/Repith/blob/main/public/Communicator/functionallity.png)
![Responsivness](https://github.com/Repith/Repith/blob/main/public/Communicator/responsive.png)


## Credits

Special thanks to [CodeWithAntonio](https://github.com/AntonioErdeljac) for this project :star: 
