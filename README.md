# Blog Website With DB

![GitHub stars](https://img.shields.io/github/stars/duttabikram/Blog-Website-With-DB?style=social)
![GitHub forks](https://img.shields.io/github/forks/duttabikram/Blog-Website-With-DB?style=social)
![GitHub last commit](https://img.shields.io/github/last-commit/duttabikram/Blog-Website-With-DB)
![GitHub package.json version](https://img.shields.io/github/package-json/v/duttabikram/Blog-Website-With-DB)
![License](https://img.shields.io/github/license/duttabikram/Blog-Website-With-DB)

## Description

A full-featured blog website built with Node.js, Express, and MongoDB. The application supports user authentication, blog post creation, editing, and deletion, along with a responsive front-end using EJS templates and CSS. It integrates Passport.js for authentication, JSON Web Tokens (JWT) for session management, and uses Mongoose as the ODM for MongoDB interactions.

Key components include:

- **User Authentication**: Secure registration and login using bcrypt for password hashing and JWT for session handling.
- **Blog Management**: Create, read, update, and delete blog posts with rich text support via EJS views.
- **Admin Dashboard**: Compose, edit, and manage posts through dedicated routes and views.
- **Contact & About Pages**: Static informational pages for site visitors.
- **Responsive Design**: Clean and modern UI styled with custom CSS.

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (local or cloud instance)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/duttabikram/Blog-Website-With-DB.git
   cd Blog-Website-With-DB
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Start the application**:
   ```bash
   npm start
   ```

   The server will run on `http://localhost:3000`.

## Usage

Once the application is running, you can access it in your browser at `http://localhost:3000`.

### Available Routes

| Route           | Method | Description                          |
|----------------|--------|--------------------------------------|
| `/`            | GET    | Home page                            |
| `/about`       | GET    | About page                           |
| `/contact`     | GET    | Contact page                         |
| `/login`       | GET/POST | User login                         |
| `/signup`      | GET/POST | User registration                  |
| `/compose`     | GET/POST | Create a new blog post (auth required) |
| `/posts/:id`   | GET    | View a specific blog post            |
| `/posts/:id/edit` | GET/POST | Edit a blog post (auth required) |
| `/logout`      | GET    | Log out user                         |

### Example: Creating a Blog Post

After logging in, navigate to `/compose` and fill out the form to create a new blog post.

## Tech Stack

| Technology     | Purpose                              |
|----------------|---------------------------------------|
| Node.js        | Runtime environment                   |
| Express.js     | Web framework                         |
| MongoDB        | Database                              |
| Mongoose       | ODM for MongoDB                       |
| EJS            | Templating engine                     |
| CSS            | Styling                               |
| JavaScript     | Front-end scripting                   |
| Passport.js    | Authentication middleware             |
| JWT            | Token-based authentication            |
| Bcrypt.js      | Password hashing                      |
| dotenv         | Environment variable management       |
| body-parser    | Request body parsing                  |
| cookie-parser  | Cookie parsing                        |
| lodash         | Utility library                       |
| OpenAI SDK     | AI integration                        |
| @openrouter/sdk| Alternative AI API access             |

## Features

- ✅ User registration and login with secure password hashing
- ✅ JWT-based session management
- ✅ Create, edit, and delete blog posts
- ✅ Responsive design with EJS templating
- ✅ Passport.js authentication integration
- ✅ MongoDB database integration via Mongoose
- ✅ Environment variable configuration
- ✅ Contact and About static pages
- ✅ Custom CSS styling for layout and appearance

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

Please ensure that your code follows best practices and passes all existing tests.

## License

This project is licensed under the terms of the MIT License. See the [LICENSE](LICENSE) file for more details.