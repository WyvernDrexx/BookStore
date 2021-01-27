import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function generatePasswordHash(password: String) {
  return bcrypt.hash(password, 10);
}

async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

async function generateJWT(payload: object): Promise<string> {
  return new Promise(function (resolve, reject) {
    jwt.sign(payload, process.env.TOKEN_SECRET, (err, token) => {
      if (err) throw err;
      return resolve(token);
    });
  });
}

export { generatePasswordHash, comparePassword, generateJWT };
