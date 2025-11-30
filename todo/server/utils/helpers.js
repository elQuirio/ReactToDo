
export const clearCookies = (res) => {
    return res.cookie("userId", '', { httpOnly: true, sameSite: "Lax", secure: false, maxAge: 0 });
}