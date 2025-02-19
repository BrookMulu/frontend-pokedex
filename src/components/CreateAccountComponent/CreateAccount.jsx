"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import Image from "next/image";
import GoogleLogo from "../LoginComponents/GoogleIcon";
import Footer from "../Footer/Footer";
import Link from "next/link";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile} from "firebase/auth";
import { auth, googleProvider, doc } from "@/utils/firebase"; 

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleCreateAccount = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; 

      await updateProfile(user, {
        displayName: username, // Set the username as the display name
      });
      console.log("User created:", userCredential.user);
      // Navigate to the main page upon successful account creation
      router.push("/");
    } catch (error) {
      console.error("Error creating account:", error.message);
      alert(error.message);
    }
  };

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
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"60vh"} marginBottom={"300px"}>
        <Box
          width={"650px"}
          height={"875px"}
          bgcolor={"#dddddd"}
          borderRadius={"16px"}
          boxShadow={"0 4px 8px rgba(0, 0, 0, 0.2)"}
          marginTop={"300px"}
          sx={{ backgroundColor: "#ffffff" }}
        >
          <Image
            src={"/PokeballFooter.png"}
            width={50}
            height={0}
            className="mx-auto lg:mx-42 lg:mt-5 lg:mb-5"
          />
          <Typography
            variant={"h5"}
            color={"textPrimary"}
            display={"flex"}
            justifyContent={"center"}
            marginBottom={"20px"}
            fontWeight={"bold"}
          >
            Create Account
          </Typography>

          {/* Email Field */}
          <Typography variant={"h7"} color={"textPrimary"} display={"flex"} marginLeft={"150px"} marginTop={"20px"}>
            Create Email:
          </Typography>
          <Box display={"flex"} marginLeft={"150px"} marginTop={"10px"} marginBottom={"30px"}>
            <TextField
              style={{ width: "350px" }}
              id="outlined-email"
              label="Enter Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>

          {/* Username Field */}
          <Typography variant={"h7"} color={"textPrimary"} display={"flex"} marginLeft={"150px"} marginTop={"20px"}>
            Create Username:
          </Typography>
          <Box display={"flex"} marginLeft={"150px"} marginTop={"10px"} marginBottom={"30px"}>
            <TextField
              style={{ width: "350px" }}
              id="outlined-username"
              label="Enter Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Box>

          {/* Password Field */}
          <Typography variant={"h7"} color={"textPrimary"} display={"flex"} marginLeft={"150px"} marginTop={"20px"}>
            Create Password:
          </Typography>
          <Box display={"flex"} marginLeft={"150px"} marginTop={"10px"} marginBottom={"30px"}>
            <TextField
              style={{ width: "350px" }}
              id="outlined-password"
              label="Enter Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>

          {/* Confirm Password Field */}
          <Typography variant={"h7"} color={"textPrimary"} display={"flex"} marginLeft={"150px"} marginTop={"20px"}>
            Confirm Password:
          </Typography>
          <Box display={"flex"} marginLeft={"150px"} marginTop={"10px"} marginBottom={"30px"}>
            <TextField
              style={{ width: "350px" }}
              id="outlined-confirm-password"
              label="Enter Password"
              variant="outlined"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Box>

          {/* Create Account Button */}
          <Box display={"flex"} justifyContent={"center"} marginBottom={"25px"}>
            <Button
              onClick={handleCreateAccount}
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
            >
              Create Account
            </Button>
          </Box>

          {/* Google Sign-In */}
          <Box sx={{ display: "flex", alignItems: "center", my: 2, marginBottom: "25px" }}>
            <Divider sx={{ flex: 1, marginLeft: "150px", borderColor: "rgba(0, 0, 0, 0.2)" }} />
            <Typography sx={{ mx: 2, color: "rgba(0, 0, 0, 0.6)", fontSize: "14px" }}>or continue with</Typography>
            <Divider sx={{ flex: 1, marginRight: "150px", borderColor: "rgba(0, 0, 0, 0.2)" }} />
          </Box>
          <Box sx={{ textAlign: "center", marginBottom: "25px" }}>
            <Button
              onClick={handleGoogleSignIn}
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
                "&:hover": { borderColor: "#92CCE5", color: "#92CCE5", backgroundColor: "rgba(66, 133, 244, 0.1)" },
              }}
            >
              Sign in with Google
            </Button>
          </Box>

          {/* Already Have an Account */}
          <Link href="/login">
            <Typography
              style={{ textDecoration: "underline" }}
              variant={"h8"}
              color={"textPrimary"}
              display={"flex"}
              justifyContent={"center"}
              marginLeft={"400px"}
              sx={{ cursor: "pointer", "&:hover": { color: "rgba(0, 0, 0, 0.5)" } }}
            >
              Already have an account?
            </Typography>
          </Link>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default CreateAccount;





