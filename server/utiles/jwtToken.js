export const generateToken = (user, message, statusCode, res) => {
    const token = user.generateJsonWebToken();

    // Parse COOKIE_EXPIRES as a number
    const cookieExpireDays = parseInt(process.env.COOKIE_EXPIRES, 10);

    // Log the environment variable and parsed value
    console.log("COOKIE_EXPIRES (raw):", process.env.COOKIE_EXPIRES);
    console.log("COOKIE_EXPIRES (parsed):", cookieExpireDays);

    // Check if the parsing was successful
    if (isNaN(cookieExpireDays)) {
        console.error("COOKIE_EXPIRES environment variable is not a valid number");
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }

    // Calculate the expiration date
    const expires = new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000);

    // Log the expiration date for debugging
    console.log("Token expires at:", expires);

    res.status(statusCode).cookie("token", token, {
        expires, // Correctly set the expiration date
        httpOnly: true
    }).json({
        success: true,
        message,
        token,
        user,
    });
}
