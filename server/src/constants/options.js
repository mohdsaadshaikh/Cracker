export const corsOpts = {
  origin: "https://cracker.up.railway.app",
  credentials: true,
};

export const cookieOptions = {
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  httpOnly: true,
  secure: true,
  sameSite: "none",
};
