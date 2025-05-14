// const codeExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
// console.log(codeExpiresAt);

// export default codeExpiresAt;

// utils/codeExpiresAt.js
function codeExpiresAt() {
  const expiresInMinutes = 10;
  const now = new Date();
  now.setMinutes(now.getMinutes() + expiresInMinutes);
  console.log(now);
  return now;
}

export default codeExpiresAt;
