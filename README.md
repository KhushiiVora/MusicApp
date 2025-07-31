# Music App with Micro Frontend Architecture

A React-based music library application built with Module Federation, featuring role-based authentication and a clean, modern UI.

## Features

- **Music Library UI**: Clean interface with song list, filtering, sorting, and grouping
- **Micro Frontend Architecture**: Split into Main App (container) and Music Library (remote)
- **Authentication & Role Management**:
  - Admin role: Can add and delete songs
  - User role: Can only view and filter songs
- **Modern UI**: Responsive design with CSS styling

## Installation

1. **Clone or download the project**

2. **Install dependencies for both apps**:<br/>
   2.1 For main-app:

   ```bash
   npm install
   ```
   2.2 For music-library:
    ```bash
   npm install
   ```

## Running the Application

### Run apps separately

**Terminal 1 - Start Music Library**:

```bash
cd music-library
npm run dev
```

**Terminal 2 - Start Main App**:

```bash
cd main-app
npm run dev
```

## Accessing the Application

- **Main App**: http://localhost:3000
- **Music Library**: http://localhost:3001

## Test Credentials

### Admin User

- Username: `admin`
- Password: `admin123`
- Permissions: View, filter, sort, group, add, and delete songs

### Regular User

- Username: `user`
- Password: `user123`
- Permissions: View, filter, sort, and group songs only

## Features

### Music Library Features

- **Filter**: Search songs by title, artist, or album
- **Sort**: Sort by title, artist, or album
- **Group**: Group by artist or album
- **Add/Delete**: Admin users can add new songs or delete existing ones

### Technical Features

- **Module Federation**: Webpack 5 Module Federation for micro frontend architecture
- **React 18**: Latest React with hooks and Suspense
- **Role-based UI**: Different controls shown based on user role
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **Frontend**: React 18, CSS3
- **Build Tool**: Webpack 5 with Module Federation
- **Architecture**: Micro Frontend with Module Federation
- **Authentication**: In-memory JWT simulation

## Deployment

### 1. Build Each App for Production

From inside each app folder:

```bash
npx cross-env NODE_ENV=production webpack --config ./config/webpack.config.js
```
This generates a `dist/` folder for deployment.

### 2. Deploy to Netlify
- Deploy the `dist/` folder of music-library to Netlify first.
- Copy the Netlify URL
- Update `main-app/config/webpack.config.js` to use the remote
- Rebuild the `main-app`, then deploy its `dist/` folder to Netlify as well.

## Live Demo Links
- **Music App**: https://music-app-kv.netlify.app/
- **Music Library**: https://music-library-kv.netlify.app/
