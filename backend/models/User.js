const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "your_password",
  database: "your_db",
});

module.exports = {
  async findByEmail(email) {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    return [rows];
  },
  async create(user) {
    const { name, email, password } = user;
    await pool.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password]);
  },
};
