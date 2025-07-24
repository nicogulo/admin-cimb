"use client";

import React from "react";
import { redirect } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const Root: React.FC = () => {
  const { auth } = useAuth();
  const { isLoggedIn } = auth;
  if (!isLoggedIn) {
    return redirect("/auth/sign-in");
  } else {
    redirect("/dashboard");
  }
};

export default Root;
