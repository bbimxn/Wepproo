function validateForm() {

    let username = document.getElementById("username").value;
    if (username.length < 5) {
        alert("Username must be at least 5 characters long");
        return false;
    }

    let email = document.getElementById("email").value;
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please entry your email correctly");
        return false;
    }

    let tel = document.getElementById("tel").value;
    let phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(tel)) {
        alert("Phone number must be 10 digits and contain only numbers.");
        return false;
    }

    let password = document.getElementById("password").value;
    let passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passPattern.test(password)) {
        alert("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character");
        return false;
    }

    let confirm = document.getElementById("confirm").value;
    if (password !== confirm) {
        alert("Confirm password does not match");
        return false;
    }

    return true;

}
