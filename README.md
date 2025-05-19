# My MERN Auth Project

This is a full-stack authentication project using React, Node.js, Express, MongoDB, and Google OAuth.

## Features

- User registration and login
- Google OAuth login
- Password reset via email
- Protected routes

## How to Run

1. Install dependencies:
   ```
   cd server
   npm install
   cd ../client
   npm install
   ```
2. Set up your `.env` files in the `server` folder.
3. Build the frontend:
   ```
   cd client
   npm run build
   ```
4. Start the backend:
   ```
   cd ../server
   npm start
   ```

## Deployment

- Make sure to set all environment variables in production.
- Update CORS and OAuth URLs for your deployed domain.

## License

MIT
