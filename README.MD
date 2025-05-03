# API Routes and Frontend Usage

## User Authentication Routes
1. **Login**
   - **Endpoint**: `POST /api/v1/user/login`
   - **Frontend Usage**: 
     - File: `frontend/src/pages/Login.jsx`
     - Function: `handleSubmit`
     - Sends user name and email to the backend to initiate login and receive an OTP.

2. **Verify OTP**
   - **Endpoint**: `POST /api/v1/user/verify-otp`
   - **Frontend Usage**: 
     - File: `frontend/src/pages/Otp.jsx`
     - Function: `handleSubmit`
     - Verifies the OTP entered by the user and generates a JWT token.

3. **Resend OTP**
   - **Endpoint**: `POST /api/v1/user/resend-otp`
   - **Frontend Usage**: 
     - File: `frontend/src/pages/Otp.jsx`
     - Function: `handleResend`
     - Resends the OTP to the user's email.

4. **Google Login**
   - **Endpoint**: `POST /api/v1/user/google-login`
   - **Frontend Usage**: 
     - File: `frontend/src/pages/Login.jsx`
     - Function: `handleCredentialResponse`
     - Logs in the user using Google OAuth.

---

## Admin Authentication Routes
1. **Register Admin**
   - **Endpoint**: `POST /api/v1/admin/register`
   - **Frontend Usage**: Not implemented in the frontend.
   - Registers a new admin (requires admin authentication).

2. **Admin Login**
   - **Endpoint**: `POST /api/v1/admin/login`
   - **Frontend Usage**: Not implemented in the frontend.
   - Logs in an admin and generates a token.

3. **Admin Logout**
   - **Endpoint**: `POST /api/v1/admin/logout`
   - **Frontend Usage**: Not implemented in the frontend.
   - Logs out an admin and invalidates the session.

---

## User Routes
1. **Book a Bike**
   - **Endpoint**: `POST /api/v1/user/book`
   - **Frontend Usage**: Not implemented in the frontend.
   - Creates a booking for a bike.

2. **Get Cart**
   - **Endpoint**: `GET /api/v1/user/cart/:userId`
   - **Frontend Usage**: Not implemented in the frontend.
   - Retrieves the cart details for a user.

3. **Delete Cart**
   - **Endpoint**: `DELETE /api/v1/user/cart/:userId`
   - **Frontend Usage**: Not implemented in the frontend.
   - Deletes the cart for a user.

4. **Add Accessories to Cart**
   - **Endpoint**: `POST /api/v1/user/cart/:userId/accessories`
   - **Frontend Usage**: Not implemented in the frontend.
   - Adds accessories to the user's cart.

---

## Static Data Routes
1. **Get Bikes**
   - **Endpoint**: `GET /api/v1/data/bikes`
   - **Frontend Usage**: 
     - File: `frontend/src/pages/Home.jsx`
     - Function: `useEffect` (fetches bike data on page load).
     - Retrieves the list of bikes.

2. **Get Accessories**
   - **Endpoint**: `GET /api/v1/data/accessories`
   - **Frontend Usage**: 
     - File: `frontend/src/pages/Home.jsx`
     - Function: `useEffect` (fetches accessories data on page load).
     - Retrieves the list of accessories.

3. **Get Reviews**
   - **Endpoint**: `GET /api/v1/data/reviews`
   - **Frontend Usage**: Not implemented in the frontend.
   - Retrieves all reviews.

---

## How to Use These APIs in the Frontend
1. **Install Axios**: Ensure `axios` is installed in the frontend project.
   ```bash
   npm install axios
   ```

2. **Fetch Data Example**: Use the following code snippet to fetch bike data from the API.
   ```javascript
   import axios from "axios";

   const fetchData = async () => {
     try {
       const response = await axios.get("http://localhost:5000/api/v1/data/bikes");
       console.log(response.data);
     } catch (error) {
       console.error("Error fetching data:", error);
     }
   };

   fetchData();
   ```

3. **Fetch Protected Data Example**: Use the following code snippet to fetch protected cart data from the API.
   ```javascript
   const token = localStorage.getItem("token");
   const config = {
     headers: { Authorization: `Bearer ${token}` },
   };

   const fetchProtectedData = async () => {
     try {
       const response = await axios.get("http://localhost:5000/api/v1/user/cart/123", config);
       console.log(response.data);
     } catch (error) {
       console.error("Error fetching protected data:", error);
     }
   };

   fetchProtectedData();
   ```
