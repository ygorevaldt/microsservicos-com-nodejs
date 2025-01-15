"use client";

import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useUser } from "@auth0/nextjs-auth0/client";

function Home() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <header>
        <h1>Bem vindo, {user ? user.nickname : ""}!</h1>
        <p>Esta é a página home, você está vendo ela porque está autenticado </p>
      </header>
      <main>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </main>
      <footer>
        <a href="/api/auth/logout">logout</a>
      </footer>
    </div>
  );
}

export default withPageAuthRequired(Home);
