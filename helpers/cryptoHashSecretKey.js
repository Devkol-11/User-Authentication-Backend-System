import crypto from "crypto";

// Generate a 32-byte (256-bit) random key in hexadecimal format for access tokens
function generateAccessSecretHex() {
  const accessTokenSecretHex = crypto.randomBytes(32).toString("hex");
  console.log("accessTokenSecretHex:", accessTokenSecretHex);
  return accessTokenSecretHex;
}

// Generate a 64-byte (512-bit) random key in hexadecimal format for refresh tokens
function generateRefreshSecretHex() {
  const refreshTokenSecretHex = crypto.randomBytes(64).toString("hex");
  console.log("refreshTokenSecretHex:", refreshTokenSecretHex);
  return refreshTokenSecretHex;
}

generateAccessSecretHex();
generateRefreshSecretHex();

// export { generateAccessSecretHex, generateRefreshSecretHex };
