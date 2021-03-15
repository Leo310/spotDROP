async function logout() {
    const options = {
        method: 'POST',
    }
    const response = await fetch("/logout", options);
    window.location = "/index";
}