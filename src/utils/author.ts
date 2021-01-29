import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function generatePasswordHash(password: string) {
  return bcrypt.hash(password, 10);
}

async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

async function generateJWT(payload: object): Promise<string> {
  return new Promise(function (resolve, reject) {
    jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) throw err;
        return resolve(token);
      }
    );
  });
}

export type AuthPayload = {
  token: string | null;
  isAuthenticated: boolean;
  email: string;
  name: string;
  iat: number;
  exp: number;
  id: String;
};

async function getUserData(token: string): Promise<AuthPayload> {
  return new Promise(function (resolve, reject) {
    try {
      const { email, name, id, exp, iat }: AuthPayload = jwt.verify(
        token,
        process.env.TOKEN_SECRET
      ) as AuthPayload;
      resolve({
        token,
        isAuthenticated: true,
        email,
        name,
        id,
        exp,
        iat,
      });
    } catch (error) {
      resolve({
        token: null,
        isAuthenticated: false,
        email: null,
        name: null,
        iat: null,
        exp: null,
        id: null,
      });
    }
  });
}

export { generatePasswordHash, comparePassword, generateJWT, getUserData };
