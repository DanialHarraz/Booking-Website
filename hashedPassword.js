const bcrypt = require("bcryptjs");

async function hashPassword() {
  const password = "Razak1234"; // <-- wrap the password in quotes
  const hashed = await bcrypt.hash(password, 10); // 10 is the salt rounds
  console.log(hashed); // copy this hash for your SQL insertion
}

hashPassword();
