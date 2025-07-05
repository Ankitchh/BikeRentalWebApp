import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Slide, ToastContainer, toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [Email, setEmail] = useState("");
  const [FullName, setFullName] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const data = { name: FullName, email: Email };

  // sending data the backend

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/login`,
        data
      );

      const userId = res.data.data.userId;
      const email = res.data.data.email;

      localStorage.setItem("userId", userId);
      localStorage.setItem("email", email);

      toast.success("otp sent to your email");
      setTimeout(() => {
        toast.success("Please check your email");
      }, 1000);

      setEmail("");
      setFullName("");
      setTimeout(() => setIsLoading(false), 800);
      setTimeout(() => navigate("/login/otp"), 800);
    } catch (error) {
      console.error("Error handelSubmit", error);
      toast.error("Error Logging !");
      setIsLoading(false);
    }
  };

  // Google Auth sign-In

  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

  const handleCredentialResponse = (response) => {
    console.log("Google Token: ", response.credential);

    fetch(`${import.meta.env.VITE_BASE_URL}/user/google-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: response.credential }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.user_data);

        login(data.user);
        const token = data.token;
        localStorage.setItem("token", token);
        console.log("Server Response: ", data);
        navigate("/");
      });
  };

  useEffect(() => {
    // Initialize Google Sign-In
    window.google.accounts.id.initialize({
      client_id: CLIENT_ID, // Replace with your actual client ID
      callback: handleCredentialResponse,
    });

    // Render the Google Sign-In button
    window.google.accounts.id.renderButton(
      document.getElementById("google-sign-in"),
      {
        theme: "outline", // cleaner look
        shape: "pill", // matches the rounded style
        text: "continue_with", // better UX
      }
    );
  }, []);

  return (
    <>
      {IsLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="font-[poppins] min-h-screen w-full bg-[url(https://www.orangewayfarer.com/wp-content/uploads/2021/01/DJI_0298-01.jpg)] bg-cover p-4 flex justify-center items-center lg:justify-end lg:pr-30 ">
          <div className=" h-[34rem]  w-[24rem] border border-white bg-transparent backdrop-blur-2xl rounded-md lg:mr-10">
            <div className="mt-3 text-center text-xl font-bold">
              <h1>Welcome to Bike-Rental !</h1>
            </div>
            <div className="flex justify-center items-center mt-2 "></div>
            <div className="w-3/4 bg-black h-[2px] ml-10 "></div>
            <div className="flex items-center justify-center mt-2"></div>
            <form onSubmit={handleSubmit}>
              <div
                className=" shadow-2xl m-7 p-2 h-75 text-center rounded"
                style={{ boxShadow: "10px 10px 10px 10px rgba(0, 0, 0, 0.2)" }}
              >
                <label
                  className="mt-2 text-xl font-semibold"
                  htmlFor="FullName"
                >
                  Full Name
                </label>
                <hr className="mb-2 mt-1.5 w-3/4 ml-10" />
                <input
                  className="outline-none border w-[90%] px-3 py-2 mt-3 rounded bg-transparent text-zinc-900"
                  type="text"
                  placeholder="Enter Your FullName"
                  value={FullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                  id="FullName"
                  required
                />
                <div className="mt-3">
                  <label className="mt-4 text-xl font-semibold" htmlFor="Email">
                    Email
                  </label>
                  <div className="w-3/4 bg-white h-[1px] mt-2 ml-10 mb-2 "></div>
                  <input
                    className="outline-none border  w-[90%] px-3 py-2 mt-3 rounded bg-transparent text-zinc-900"
                    type="email"
                    placeholder="Enter Your Email"
                    value={Email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    id="Email"
                    required
                  />
                </div>

                <button
                  className="bg-transparent py-2 px-2 mt-6 w-40 rounded-sm font-bold border cursor-pointer "
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
            <div className="mt-2">
              <div className="">
                <div
                  className="rounded ml-10 w-[80%] "
                  id="google-sign-in"
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer
        theme="dark"
        autoClose={2000}
        closeOnClick={true}
        transition={Slide}
      />
    </>
  );
}

export default Login;
