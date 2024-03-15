class User {
    constructor(
        username,
        firstName, 
        lastName, 
        email,
        user_language, 
        password,
        role,
        ) {

            // Validation for username: Should be a non-empty string
            if (typeof username !== "string" || username.trim() === "") {
                throw new Error("Username must be a non-empty string.");
            }
            if (typeof firstName !== "string") {
                throw new Error("First Name is required and must be a string.");
            }
          
            if (typeof lastName !== "string") {
                throw new Error("Last Name is required and must be a string.");
            }

            if (typeof email !== "string" || email.trim() === "") {
                throw new Error("Username must be a non-empty string.");
            }

            if (typeof role !== "string" || role.trim() === "") {
                throw new Error("Role must be a non-empty string.");
            }

            this.username = username;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.user_language = user_language;
            this.password = password;
            this.role = role;
    }

}

module.exports = User;