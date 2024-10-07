export const corsOpts = {
  origin: ["http://localhost:5173", process.env.FRONTEND_URL],
  credentials: true,
};

export const cookieOptions = {
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};
