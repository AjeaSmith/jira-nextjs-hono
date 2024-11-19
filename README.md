## Jira Clone by YT Code with Antonio - Project Reference Guide
### Tech stack: Next, ReactQuery, Appwrite, and Hono

The project is organized into features (auth, users, etc.) Within the ``features`` folder, each feature will have
- ``api`` folder for the react query hooks that makes API calls
- ``components`` folder, for the relevant components needed.
- ``server`` folder, that defines the API routes for the feature

**ReactQuery** and **Hono** provides end-to-end type-safety in this project. RQ(frontend) Hono(backend).

**Note to self:** ```api/[[...route]]/route.ts``` is a catch all route for Nextjs to direct routes to be handled by **Hono** 

## Auth Section (Sign in and Sign up)
- Used Shadcn for form components
- Validated form using Zod on FE
- Use react query for making type-safe API calls to server
- Session middlware is called to check if user is logged in. It also sets the current user in context (c) to use within route endpoint. see ```session-middlware.ts``` and ```auth/server/route.ts```
- Protect sign-in and sign-up routes if user already exist
- Protect home route if user doesn't exist

---------

## Dashboard 
- Made dashboard layout responsive on all screen sizes
- Repsonsive open and close sidebar, routing to desired pages.
- Dropdown menu to view workspaces to choose from in sidebar

-------------

## Workspace Form
- Uses shadcn/react-hook-form with zod for handling form submission
- Implement the creating a workspace server route
- Render success and error messages with toaster

## 