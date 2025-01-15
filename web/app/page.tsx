"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (error) return;

    if (!user) {
      router.push("/api/auth/login");
    } else {
      router.push("/home");
    }
  }, [user, isLoading, router]);

  return null;
}
