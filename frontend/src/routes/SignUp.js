import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { makeUnauthenticatedPOSTRequest } from "../utils/helpers";
import { BG_URL } from "../utils/contants";
import { useNavigate } from "react-router-dom";
import Header from "../components/shared/Header";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignInForm, setIsSignInForm] = useState(true);

  const [cookie, setCookie] = useCookies(["token"]);

  const navigate = useNavigate();

  const handleButtonClick = async () => {
    const data = { name, email, password };

    if (!isSignInForm) {
      const response = await makeUnauthenticatedPOSTRequest(
        "/auth/register",
        data
      );
      if (response && !response.err) {
        // console.log(response);
        const token = response.token;
        const date = new Date();
        date.setDate(date.getDate() + 30);
        setCookie("token", token, { path: "/", expires: date });
        alert("Success");
        navigate("/home");
      } else {
        alert("Failure");
      }
    } else {
      const response = await makeUnauthenticatedPOSTRequest(
        "/auth/login",
        data
      );
      if (response && !response.err) {
        const token = response.token;
        const date = new Date();
        date.setDate(date.getDate() + 30);
        setCookie("token", token, { path: "/", expires: date });
        alert("Success");
        navigate("/home");
      } else {
        alert("Failure");
      }
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute p-12 bg-black w-full md:w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}

        <input
          type="text"
          placeholder="Email Address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="p-4 my-4 w-full bg-gray-700"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="p-4 my-4 w-full bg-gray-700"
        />
        {/* <p className="text-red-500  font-bold text-lg py-2">{errorMessage}</p> */}
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm ? "New User? Sign Up" : "Already registered? Sign In"}
        </p>
      </form>
    </div>
  );
};

export default SignUp;
