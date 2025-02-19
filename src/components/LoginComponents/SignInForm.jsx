"use client";
import React, { useState } from "react";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import Image from "next/image";
import GoogleLogo from "./GoogleIcon";
import PokedexLogo from "../Footer/PokedexLogo";
import Footer from "../Footer/Footer";
import Link from "next/link";
import { auth, googleProvider } from "@/utils/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [identifier, setIdentifier] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(""); // Clear error on success
      router.push("/"); // Navigate to the main page
    } catch (err) {
      console.error("Error signing in:", err.message);
      setError(err.message); // Set error message
    }
      };
    // const handleSignIn = async () => {
    //     try {
    //     await loginWithUsernameOrEmail(identifier, password); // Updated function
    //     setError(""); // Clear error on success
    //     router.push("/"); // Navigate to the main page
    //     } catch (err) {
    //     console.error("Error signing in:", err.message);
    //     setError(err.message); // Set error message
    //     }
    // };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setError(""); // Clear error on success
      router.push("/"); // Navigate to the main page
    } catch (err) {
      console.error("Error with Google sign-in:", err.message);
      setError(err.message); // Set error message
    }
  };

  return (
    <>
      <div style={{ marginTop: "70px" }}>
        <PokedexLogo />
      </div>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"60vh"} marginBottom={"100px"}>
        <Box
          width={"600px"}
          height={"650px"}
          marginTop={"70px"}
          bgcolor={"#dddddd"}
          borderRadius={"16px"}
          boxShadow={"0 4px 8px rgba(0, 0, 0, 0.2)"}
          sx={{ backgroundColor: "#ffffff" }}
        >
          <Image
            src="/PokeballFooter.png"
            width={50}
            height={0}
            className="mx-auto lg:mx-42 lg:mt-5 lg:mb-5"
            alt="Pokeball Icon"
          />
          <Typography
            variant={"h5"}
            color={"textPrimary"}
            display={"flex"}
            justifyContent={"center"}
            marginBottom={"20px"}
            fontWeight={"bold"}
          >
            Welcome to the Pokedex
          </Typography>
          {error && (
            <Typography
              variant="body2"
              color="error"
              display={"flex"}
              justifyContent={"center"}
              marginBottom={"20px"}
            >
              {error}
            </Typography>
          )}
          <Typography variant={"h7"} color={"textPrimary"} marginLeft={"125px"} marginTop={"40px"}>
            Username or Email
          </Typography>
          <Box marginLeft={"125px"} marginTop={"10px"} marginBottom={"30px"}>
            <TextField
              style={{ width: "350px" }}
              id="email"
              label="Enter Username or Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Typography variant={"h7"} color={"textPrimary"} marginLeft={"125px"}>
            Password
          </Typography>
          <Box marginLeft={"125px"} marginTop={"10px"} marginBottom={"40px"}>
            <TextField
              style={{ width: "350px" }}
              id="password"
              label="Enter Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Box display={"flex"} justifyContent={"center"} marginBottom={"25px"}>
            <Button
              sx={{
                borderRadius: "8px",
                boxShadow: "none",
                backgroundColor: "#92CCE5",
                "&:hover": {
                  backgroundColor: "#A2D4EC",
                  boxShadow: "0 4px 6px rgba(146, 204, 229, 0.4)",
                },
                width: 350,
                height: 55,
                fontSize: "14px",
              }}
              variant="contained"
              color="primary"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", my: 2, marginBottom: "25px" }}>
            <Divider sx={{ flex: 1, marginLeft: "125px", borderColor: "rgba(0, 0, 0, 0.2)" }} />
            <Typography sx={{ mx: 2, color: "rgba(0, 0, 0, 0.6)", fontSize: "14px" }}>
              or continue with
            </Typography>
            <Divider sx={{ flex: 1, marginRight: "125px", borderColor: "rgba(0, 0, 0, 0.2)" }} />
          </Box>
          <Box sx={{ textAlign: "center", marginBottom: "25px" }}>
            <Button
              variant="outlined"
              startIcon={<GoogleLogo />}
              sx={{
                color: "#757575",
                borderColor: "#757575",
                borderRadius: "12px",
                textTransform: "none",
                fontSize: "16px",
                fontWeight: 500,
                width: 350,
                height: 55,
                padding: "10px 20px",
                "&:hover": {
                  borderColor: "#92CCE5",
                  color: "#92CCE5",
                  backgroundColor: "rgba(66, 133, 244, 0.1)",
                },
              }}
              onClick={handleGoogleSignIn}
            >
              Sign in with Google
            </Button>
          </Box>
          <Link href="/create-account">
            <Typography
              style={{ textDecoration: "underline" }}
              variant={"h8"}
              color={"textPrimary"}
              display={"flex"}
              justifyContent={"center"}
              marginLeft={"400px"}
              sx={{
                cursor: "pointer",
                "&:hover": { color: "rgba(0, 0, 0, 0.5)" },
              }}
            >
              Create an account
            </Typography>
          </Link>
        </Box>
      </Box>
      <Box style={{ marginTop: "140px", marginBottom: "80px" }}>
        <Footer />
      </Box>
    </>
  );
};

export default SignIn;



