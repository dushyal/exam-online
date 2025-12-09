import bcrypt from "bcrypt";
import { sequelize } from "./src/config/db.js";
import { User } from "./src/models/index.js";

const reset = async () => {
  await sequelize.authenticate();

  const hash = await bcrypt.hash("admin123", 10);

  await User.update(
    { password_hash: hash },
    { where: { email: "admin@gmail.com" } }
  );

  console.log("Admin password reset to: admin123");
  process.exit();
};

reset();
