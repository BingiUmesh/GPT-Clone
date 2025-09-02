# GPT Chat Application

A full-stack chat application powered by Gemini AI, featuring a modern React frontend and a Node.js/Express backend. This project demonstrates real-time AI-powered chat capabilities with a clean, user-friendly interface.

## Features

- **AI Chat**: Interact with Gemini AI models for intelligent conversations.
- **Modern UI**: React frontend styled for usability and aesthetics.
- **Extensible Backend**: Node.js/Express server with modular architecture.
- **Easy Setup**: Simple installation and configuration for local development.

## Project Structure

```
GPT/
├── BackEnd/
│   ├── models/         # Mongoose models
│   ├── routes/         # Express routes
│   ├── utils/          # AI integration utilities
│   ├── package.json    # Backend dependencies
│   └── server.js       # Express server entry point
├── Frontend/
│   ├── public/         # Static assets
│   ├── src/            # React components and styles
│   ├── package.json    # Frontend dependencies
│   └── vite.config.js  # Vite configuration
└── Readme.md           # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd BackEnd
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables (e.g., API key for Gemini) in a `.env` file.
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Configuration

- **API Keys**: Store your Gemini API key in the backend `.env` file.
- **Port Configuration**: Default ports can be changed in `server.js` (backend) and `vite.config.js` (frontend).

## Scripts

- **Backend**
  - `npm start` — Start the Express server
- **Frontend**
  - `npm run dev` — Start the Vite development server

## Technologies Used

- **Frontend**: React, Vite, CSS
- **Backend**: Node.js, Express, Mongoose
- **AI Integration**: Gemini API

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Gemini AI](https://deepmind.google/technologies/gemini/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Express](https://expressjs.com/)
