const JWT_SECRET = process.env.JWT || "SECRET_KEY";

export const createToken = () => {
    console.log("Created Token!");
}

export const decodeToken = () => {
    console.log("Decoded Token!");
}