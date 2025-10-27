# EJS Email Template Viewer

A modern web application for creating, previewing, and testing EJS email templates with a live Express.js backend for sending test emails.

## Features

- **Live EJS Template Editing**: Edit header, body, and footer templates in real-time
- **Live Preview**: See rendered HTML output as you type
- **Template Components**: Modular header and footer components
- **Email Testing**: Send test emails using Mailtrap SMTP
- **Hot Reloading**: Development servers with hot reload support
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode**: Toggle between light and dark themes

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- EJS for template rendering
- React Hot Toast for notifications

### Backend
- Express.js with TypeScript
- Nodemailer for email sending
- Mailtrap for SMTP testing
- Swagger for API documentation

## Prerequisites

- Node.js 18+ and npm/yarn
- Mailtrap account for email testing

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/wt-sailor/ejs-viewer.git
   cd ejs-viewer
   ```

2. **Install frontend dependencies**
   ```bash
   yarn install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   yarn install
   cd ..
   ```

4. **Configure environment variables**

   **Frontend (.env)**
   ```env
   VITE_API_URL=http://localhost:3001
   ```

   **Backend (server/.env)**
   ```env
   MAILTRAP_HOST=sandbox.smtp.mailtrap.io
   MAILTRAP_PORT=2525
   MAILTRAP_USER=your-mailtrap-user
   MAILTRAP_PASS=your-mailtrap-password
   PORT=3001
   ```

## Development

1. **Start the backend server**
   ```bash
   cd server
   yarn dev
   ```
   The server will start on http://localhost:3001 with hot reloading.

2. **Start the frontend development server**
   ```bash
   yarn dev
   ```
   The app will be available at http://localhost:5173 (or next available port).

## Production Build

1. **Build the frontend**
   ```bash
   yarn build
   ```

2. **Build the backend**
   ```bash
   cd server
   yarn build
   ```

3. **Start the production server**
   ```bash
   cd server
   yarn start
   ```

## Usage

1. **Edit Templates**: Use the template editor to modify header, body, and footer components
2. **Preview**: See the rendered HTML in the preview pane
3. **Test Emails**: Enter a recipient email and send test emails
4. **Save Templates**: Templates are automatically saved to localStorage

## API Documentation

When the server is running, visit http://localhost:3001/api-docs for Swagger API documentation.

### Send Email Endpoint

```bash
POST /send-email
Content-Type: application/json

{
  "html": "<h1>Test Email</h1>",
  "recipientEmail": "test@example.com"
}
```

## Project Structure

```
ejs-viewer/
├── public/
│   └── components/          # EJS template components
├── server/
│   ├── src/
│   │   ├── emailService.ts  # Email sending service
│   │   └── index.ts         # Express server
│   ├── package.json
│   └── tsconfig.json
├── src/
│   ├── components/          # React components
│   ├── utils/               # Utility functions
│   └── App.tsx              # Main app component
├── .env                     # Frontend environment variables
├── package.json
├── vite.config.ts
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
