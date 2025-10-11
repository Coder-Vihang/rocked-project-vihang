const Sequelize = require("sequelize");
const { QueryTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
  logging: false,
});

async function runQuery(sql, options = {}) {
  try {
    const data = await sequelize.query(sql, options);
    return data;
  } catch (err) {
    console.error("Query failed:", err.message);
    throw err;
  }
}

runQuery(
  `CREATE TABLE IF NOT EXISTS test_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )`
).then((res) => {
  console.log(res);
  runQuery("INSERT INTO test_users (name) VALUES (:name)", {
    replacements: { name: "Alice" },
  }).then(console.log);

  runQuery("SELECT * FROM test_users", { type: QueryTypes.SELECT }).then(
    console.log
  );
});
