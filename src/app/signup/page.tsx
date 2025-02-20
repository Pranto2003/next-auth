"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup successful", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length>0 && user.password.length>0  && user.username.length>0 ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-black text-white">
      <h1 className="text-2xl font-bold">{loading ? "Processing..." : "Signup"}</h1>
      <hr className="w-1/2 my-4 border-gray-500" />

      {/* Username Input */}
      <label htmlFor="username" className="text-lg">Username</label>
      <input
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="p-2 my-2 w-80 rounded-md border border-gray-400 bg-white text-black"
        placeholder="Enter your username"
      />

      {/* Email Input */}
      <label htmlFor="email" className="text-lg">Email</label>
      <input
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="p-2 my-2 w-80 rounded-md border border-gray-400 bg-white text-black"
        placeholder="Enter your email"
      />

      {/* Password Input */}
      <label htmlFor="password" className="text-lg">Password</label>
      <input
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="p-2 my-2 w-80 rounded-md border border-gray-400 bg-white text-black"
        placeholder="Enter your password"
      />

      {/* Signup Button */}
      <button
        onClick={onSignup}
        disabled={buttonDisabled}
        className={`mt-4 px-4 py-2 w-80 text-lg font-semibold rounded-md ${
          buttonDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        } text-white`}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
    </div>
  );
}

export default Page;
