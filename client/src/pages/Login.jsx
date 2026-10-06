import React from "react";
import { GiPolarStar, GiHypersonicBolt } from "react-icons/gi";
import { HiMicrophone } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import { TbNavigationBolt } from "react-icons/tb";
import { IoCodeSlashOutline } from "react-icons/io5";
import logo from "../assets/logo.png";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import { ServerUrl } from "../App";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = ({ setUser, firebaseConfigured }) => {
  const Navigate = useNavigate();

  const Features = [
    {
      icon: <HiMicrophone />,
      title: "Voice AI",
      desc: "Natural real-time voice conversations.",
    },
    {
      icon: <TbNavigationBolt />,
      title: "Smart Navigation",
      desc: "Navigate pages using voice commands.",
    },
    {
      icon: <IoCodeSlashOutline />,
      title: "Easy Embedding",
      desc: "Add assistant using one script tag.",
    },
    {
      icon: <GiHypersonicBolt />,
      title: "Fast Responses",
      desc: "Optimized Gemini AI responses.",
    },
  ];

  const [loading, setLoading] = React.useState(false);

  const handleLogin = async () => {
    if (loading) return;
    if (!firebaseConfigured) {
      console.error(
        "Firebase is not configured. Add VITE_FIREBASE_API_KEY to client/.env.",
      );
      return;
    }

    setLoading(true);

    try {
      const { auth, provider } = await import("../Utils/firebase");
      const result = await signInWithPopup(auth, provider);
      const { displayName, email } = result.user;

      const res = await axios.post(
        ServerUrl + "/api/auth/google",
        { name: displayName, email },
        { withCredentials: true },
      );

      setUser(res.data);

      toast.success("Login Successfully")
      Navigate("/");
    } catch (error) {
      toast.error("Login failed...")
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-mist-100 via-white-50 to-yellow-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Div */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-3xl border-4 border-mist-700 bg-blue-100 text-blue-900 text-sm font-medium">
              <GiPolarStar /> AI Voice Assistant Platform
            </div>
            <h1 className="mt-6 text-5xl lg:text-7xl font-black leading-tight text-[#081028]">
              Build AI Assistants
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-50% to-yellow-300">
                For Any Website
              </span>
            </h1>
            <p className="mt-4 text-lg text-[#3b3d43] leading-8 max-w-2xl">
              Create customizable AI voice assistants that talk, guide users,
              and integrate into any website instantly.
            </p>

            <button
              onClick={handleLogin}
              disabled={!firebaseConfigured || loading}
              className="mt-5 h-10 px-8 pt-1.5 rounded-xl bg-yellow-200 font-semibold flex items-center gap-3 border-3 hover:scale-95 border-mist-700 transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FcGoogle className="bg-white rounded-full text-2xl" />
              {loading ? "Signing in..." : "Continue with Google"}
            </button>
            {!firebaseConfigured && (
              <p className="pt-2 text-sm text-red-700">
                Firebase is not configured. Add VITE_FIREBASE_API_KEY to
                client/.env.
              </p>
            )}
            <p className="pt-2 text-mist-600">
              Free plan includes 200 AI responses
            </p>
          </div>

          {/* Right Div */}
          <div className="relative flex flex-col items-center lg:items-start">
            {/* Prominent Logo Header */}

            {/* Logo + Title Header */}
            {/* Logo + Title Header */}
            <div className="mb-4 flex items-center gap-4">
              <img
                src={logo}
                alt="Platform Logo"
                className="w-20 h-20 object-contain shrink-0"
              />
              <h3 className="text-2xl font-bold text-[#081028] leading-none">
                Voice Assistant Hub
              </h3>
            </div>

            {/* Features Card Container */}
            <div className="relative w-full">
              {/* Glow background */}
              <div
                className="absolute inset-0 -z-10 rounded-4xl bg-linear-to-br from-blue-400/40 via-yellow-200/30 to-yellow-300/40 blur-2xl"
                aria-hidden="true"
              />

              {/* Card body */}
              <div className="relative rounded-[30px] border border-mist-500/30 bg-amber-100/90 backdrop-blur-md p-8 shadow-xl">
                <div className="flex items-center justify-between border-b border-amber-200/60 pb-4">
                  <h2 className="text-3xl font-bold text-[#081028]">
                    Features
                  </h2>
                  <span className="text-xs font-semibold px-3 py-1 bg-amber-200 text-amber-900 rounded-full">
                    Core Capabilities
                  </span>
                </div>

                {/* Features List */}
                <div className="mt-6 space-y-4">
                  {Features.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-3.5 rounded-2xl bg-white/60 border border-white/80 transition hover:bg-white/90"
                    >
                      <span className="text-2xl text-blue-600 mt-0.5">
                        {item.icon}
                      </span>
                      <div>
                        <h4 className="font-bold text-sm text-[#081028]">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-600 mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
