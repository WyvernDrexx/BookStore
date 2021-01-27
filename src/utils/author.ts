import bcrypt from "bcrypt";

function generatePasswordHash(password: String) {
  return bcrypt.hash(password, 10);
}

export { generatePasswordHash };
