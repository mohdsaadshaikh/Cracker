export const corsOpts = {
  origin: ["https://cracker.up.railway.app", "http://localhost:5173", "http://localhost:6060"],
  credentials: true,
};

export const cookieOptions = {
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "none",
};
