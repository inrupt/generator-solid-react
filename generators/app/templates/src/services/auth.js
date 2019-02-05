import auth from "solid-auth-client";

const logout = async () => {
  try {
    await auth.logout();
    // Remove localStorage
    localStorage.removeItem("solid-auth-client");
    // Redirect to login page
    return true;
  } catch (error) {
    // console.log(`Error: ${error}`);
  }
};

export default logout;
