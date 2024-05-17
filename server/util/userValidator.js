// util/userValidator.js
const validateUserData = (email, password, name, phoneNumber) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { valid: false, message: "Invalid email" };
    }

    console.log(email,password,name,phoneNumber)
    if (!name || name.trim() === "") {
        return { valid: false, message: "Name is required" };
    }
    if(!phoneNumber){
        return {valid:false,message:"please provide your phone number"}
    }

    // Validate phone number format (assuming 10-digit numeric format)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
        return { valid: false, message: "Invalid phone number format" };
    }
    if (phoneNumber.trim().length !== 10) {
        return { valid: false, message: "Invalid phone number format" };
    }

    if (password && password.length < 8) {
        return {
            valid: false,
            message: "Password must be at least 8 characters long",
        };
    }

    return { valid: true, message: "" };
}

module.exports = validateUserData;
