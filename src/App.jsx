import { Toaster } from "react-hot-toast";
import "./App.css";
import Routers from "./Routers";
import { useDispatch } from "react-redux";
import { loginSuccess, logOut } from "./Redux/Slices/authSlice";
import { clearUser, setUser } from "./Redux/Slices/userSlice";
import { checkAuth } from "./Api/authApi";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const userData = await checkAuth();
        console.log(userData);

        dispatch(loginSuccess());
        dispatch(setUser(userData));
      } catch (err) {
        console.log(err);

        dispatch(logOut());
        dispatch(clearUser());
      }
    };

    verifyAuth();
  }, []);

  return (
    <>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: "11px",
            padding: "5px 5px",
          },
        }}
      />

      <Routers />
    </>
  );
}

export default App;
