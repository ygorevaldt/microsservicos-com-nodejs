"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";

export default function Home() {
  const { user, error, isLoading } = useUser();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    async function fetchToken() {
      try {
        const response = await fetch("/api/auth");
        const { accessToken } = await response.json();
        setToken(accessToken);
      } catch (error) {
        console.log("no token");
      }
    }

    fetchToken();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl">Home</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <a className="border rounded-md px-4 py-2 w-fit" href={"/api/auth/login"}>
        Fazer Login
      </a>
      <a className="border rounded-md px-4 py-2 w-fit" href={"/api/auth/logout"}>
        Fazer logout
      </a>
      {token && <span>{token}</span>}
    </div>
  );
}
