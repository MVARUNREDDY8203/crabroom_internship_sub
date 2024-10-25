const mysql = require("mysql2");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "crabbroompayintllc";
const cors = require("cors");
const app = express();

app.use(
    cors({
        origin: "http://localhost:3001", // Explicitly allow your React dev server
        credentials: true,
    })
);
app.use(express.json());
app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
});
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.get("/", (req, res, next) => {
    res.json({ message: "Hello, World!" });
});

const query = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, res) => {
            if (err) {
                return reject(err);
            }
            resolve(res);
        });
    });
};
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "all input fields are required" });
        }

        const userQuery = "SELECT * FROM user WHERE email = ?";
        const userQueryResponse = await query(userQuery, email);
        if (userQueryResponse.length === 0)
            return res.status(400).json({ message: "no user found" });

        const user = userQueryResponse[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res
                .status(400)
                .json({ message: "invalid login credentials" });
        }
        const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
            expiresIn: "1h",
        });
        res.status(200).json({
            message: "login successful",
            token,
            username: user.name,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "error logging in",
        });
    }
});
app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "all input fields required",
            });
        }

        // checking if a user with same email already exists
        const userExistsSQL = "SELECT * FROM user WHERE email = ?";
        const userExistsResponse = await query(userExistsSQL, [email]);
        const doesAnyUserExist = userExistsResponse.length > 0 ? true : false;
        if (doesAnyUserExist) {
            return res.status(400).json({
                message: "user with same email exists already, go to login",
            });
        }

        // counting the no of users to create a new userid
        const cntSQL = "SELECT COUNT(*) AS usercnt FROM user";
        const cntResult = await query(cntSQL);
        const userCnt = cntResult[0].usercnt;

        const newUserID = userCnt + 1;

        // creating a new entry in the db
        const hashedPassword = await bcrypt.hash(password, 10);
        const insertSQL =
            "INSERT INTO user(id, name, email, password) VALUES(?,?,?,?)";
        await query(insertSQL, [newUserID, name, email, hashedPassword]);

        res.status(200).json({
            message: `new user created successfully ${newUserID}, name=${name}, email=${email}`,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "db query error" });
    }
});

// configurations for creating mysql connection
const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    database: "crabbroom",
    user: "root",
    password: "root",
});

// executing connection
db.connect(function (err) {
    if (err) {
        console.log(err);
        console.log("error occurred while connecting");
    } else {
        console.log("connection created with mysql successfully");
    }
});
