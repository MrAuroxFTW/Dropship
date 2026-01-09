# Client-Side Login/Logout System Implementation

## Completed Tasks
- [x] Add Sign In link and Sign Out button to Profile.html header
- [x] Add helper functions (loginUser, logoutUser, updateNavbar) to Profile.html
- [x] Update signOutBtn event listener in Profile.html to use logoutUser
- [x] Add navSignOutBtn event listener in Profile.html
- [x] Add login state check on Profile.html load (redirect if not logged in)
- [x] Call updateNavbar on Profile.html load
- [x] Add Sign In link and Sign Out button to SignUp.html header
- [x] Add helper functions to SignUp.html
- [x] Update SignUp.html signup form to set localStorage and redirect to Profile.html
- [x] Update SignUp.html Google signup to set localStorage and redirect to Profile.html
- [x] Add navSignOutBtn event listener and updateNavbar call to SignUp.html
- [x] Add Sign In link and Sign Out button to Login.html header
- [x] Add helper functions to Login.html
- [x] Update Login.html login form to set localStorage and redirect to Profile.html
- [x] Update Login.html Google sign-in to set localStorage and redirect to Profile.html
- [x] Remove onAuthStateChanged redirect from Login.html
- [x] Add navSignOutBtn event listener and updateNavbar call to Login.html

## Pending Tasks
- [ ] Test the system by opening the pages and verifying login/logout persistence
- [ ] Ensure all pages show correct navbar state based on login status
- [ ] Verify redirections work correctly (signup/login to Profile.html, logout to Login.html, unauthorized access to Profile.html redirects to Login.html)
