const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 15),
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};

export default setCookies;
