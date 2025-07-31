# Music App with Micro Frontend Architecture

A React-based music library application built with Module Federation, featuring role-based authentication and a clean, modern UI.

## Features

- **Music Library UI**: Clean interface with song list, filtering, sorting, and grouping
- **Micro Frontend Architecture**: Split into Main App (container) and Music Library (remote)
- **Authentication & Role Management**:
  - Admin role: Can add and delete songs
  - User role: Can only view and filter songs
- **Modern UI**: Responsive design with CSS styling

## Project Structure

```
Music App/
├── main-app/          # Main application (container)
├── music-library/     # Music library micro frontend
└── package.json       # Root package.json with dev scripts
```

## Installation

1. **Clone or download the project**

2. **Install dependencies for both apps**:

   ```bash
   npm run install:all
   ```

3. **Install root dependencies**:
   ```bash
   npm install
   ```

## Running the Application

### Option 1: Run both apps simultaneously

```bash
npm run dev
```

### Option 2: Run apps separately

**Terminal 1 - Start Music Library**:

```bash
cd music-library
npm start
```

**Terminal 2 - Start Main App**:

```bash
cd main-app
npm start
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

## Development

### Adding New Songs (Admin Only)

1. Login as admin
2. Fill in the song details (title, artist, album)
3. Click "Add Song"

### Filtering and Sorting

- Use the search box to filter songs
- Use the dropdown menus to sort or group songs

## Deployment

Both apps can be deployed separately to platforms like:

- Netlify
- Vercel
- GitHub Pages

Remember to update the remote URL in the Main App's webpack config when deploying.

## Troubleshooting

1. **Module not found error**: Ensure both apps are running and the ports are correct
2. **JSX syntax error**: Make sure all dependencies are installed
3. **CORS issues**: Check that the remote URLs are correct in webpack config

## License

This project is for educational purposes.
