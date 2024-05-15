import { createTheme, ThemeProvider } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Components/Home";
import Loader from "./Components/Loader";
import Login from "./Components/Login";
import { auth } from "./config/firebase-config";
import CommonRoute from "./routes/CommonRoute";
import colors from "./theme/colors";

const App = () => {
  const [isLoading,setIsLoading] = useState(true)
  const theme = createTheme({
    typography: {
      button: {
        textTransform: "none"
      },
      fontFamily: [
        'Nunito Sans',
      ].join(','),
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            '&:hover': {
              backgroundColor:ownerState.variant=="contained"&&colors.appPrimary
            },
          }),
        },
      },
    },
  });
  const navigate = useNavigate()
  useEffect(() => {
    navigate("/")
  }, [])
  // if(isLoading){
  //   return(
  //     <Loader/>
  //   )
  // }
  return (
    <ThemeProvider theme={theme}>
      <Routes>
      <Route exact element={<CommonRoute><Login /></CommonRoute>} path='*' />
        {/* <Route exact element={<CommonRoute authRequire><Home /></CommonRoute>} path='/' /> */}
      </Routes>
    </ThemeProvider>
  )
}
export default App