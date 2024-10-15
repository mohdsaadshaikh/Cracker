export const corsOpts = {
  origin: "http://localhost:5173",
  credentials: true,
};

const cookieOptions = {
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", 
  sameSite: 'none', 
};
