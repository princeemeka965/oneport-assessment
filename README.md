# ONEPORT 365

ONEPORT365 is a web application designed to help users create quotes efficiently

### Prerequisites
- Node.js (version 20.8.1 and above)

### Steps
1. Clone the repository:
    ```
    git clone https://github.com/princeemeka965/oneport-assessment.git
    ```
2. Navigate to the project directory:
    ```
    cd project-name
    ```
3. Install dependencies:
    ```
    npm install
    ```
   or
    ```
    yarn install
    ```
4. Start the development server:
    ```
    npm start
    ```
   or
    ```
    yarn start
    ```

The application will be accessible at `http://localhost:3000`.

### Building for Production
To build the project for production, run:
```
npm run build
```

### Project structure

- **public/**: Contains the static assets of the project.
- **src/**: Contains the source code of the application.
  - **components/**: Reusable React components.
  - **modules/**: Page components representing different sections.
  - **sagas/**: API calls and other service functions.
  - **store/**: State data are stored and retrieved
  - **helpers/**: Functions that are used across the application like time conversion functions
  - **App.tsx**: The home page or first page.
  - **NewQuote.tsx**: The second page in the application.
  - **index.tsx**: Entry point of the application.

