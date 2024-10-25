# [WORKING VIDEO](https://www.youtube.com/watch?v=y6UadtT-T3U)

- first `cd backend` and then use `nodemon index.js` to start the server
- then in a new terminal `cd frontend` and run `npm start` and select `y` for a new port request since server is already using the `port:3000`

- go to `http://localhost:3001/login` for login
- go to `http://localhost:3001/singup` for signup
- `http://localhost:3001/singup` cant be accessed before login and redirects back to `/login` when no login is found
- `http://localhost:3001/dashboard` shows `hi {username}` after login
- `logout` button can be used to logout from dashboard

using 
  -   `mysql` as the database
  -   `ReactJS` with `create-react-app` for frontend
  -   `nodeJS` with `expressJS` as backend server for the API endpoints
  -   `jwt` for authentication
  -   `bcrypt` for hashing for passwords/ encryption
