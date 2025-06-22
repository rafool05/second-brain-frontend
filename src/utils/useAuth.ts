import { useState, useEffect } from "react";

export function useAuth() {
  const [isAuth, setAuth] = useState<null | boolean>(null);

  useEffect(() => {
    fetch("http://localhost:3000/auth/check", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        // console.log(res.status)
        setAuth((res.status === 200));
      })
      .catch(() => setAuth(false));
  }, []);

  return isAuth;
}
