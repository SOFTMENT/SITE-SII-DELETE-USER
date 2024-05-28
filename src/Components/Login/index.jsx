import { Visibility, VisibilityOff } from "@mui/icons-material"
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Box, Button, CardMedia, CircularProgress, Grid, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { toast } from "react-toastify"
import images from "../../assets/images"
import { auth } from "../../config/firebase-config"
import colors from "../../theme/colors"
import { GoogleAuthProvider,signInWithPopup,OAuthProvider } from "firebase/auth";
import ConfirmationDialog from "../ConfirmationDialog"
const Login = () => {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [loading,setLoading] = useState(false)
    const deleteAccount = ()=> {
        if(!email){
            toast.error("Email Required!")
        }
        else if(!pass){
            toast.error("Password Requied!")
        }
        else{
            setLoading(true)
            signInWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setEmail("")
                setPass("")
                setIsOpen(true)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorMessage)
            })
            .finally(()=>{
                setLoading(false)
            })
        }
    }
    const appleSignin = () => {
        const provider = new OAuthProvider('apple.com');
        signInWithPopup(auth, provider)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;

            // Apple credential
            const credential = OAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
            const idToken = credential.idToken;
            setIsOpen(true)
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The credential that was used.
            const credential = OAuthProvider.credentialFromError(error);
            toast.error(errorMessage)
            // ...
        })
        .finally(()=>{
            setLoading(false)
        })

    }
    const googleSignin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            setIsOpen(true)
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            toast.error(errorMessage)
            // ...
        })
        .finally(()=>{
            setLoading(false)
        })
    }
    return (
        <Grid sx={{ backgroundColor: colors.backgroundColor, height: "100vh" }} container justifyContent={"center"}>
            <Grid item lg={4} md={6} sx={{ justifyContent:"center",alignItems:"center  " }} xs={12}>
                <CardMedia
                    component={"img"}
                    src={images.rightFrame}
                    sx={{objectFit: "contain", mt:"-60px"}}
                />
                <Stack direction={"row"} width={"100%"} alignItems={"center"} justifyContent={"center"} mt={3}>
                <CardMedia
                    component={"img"}
                    src={images.logo}
                    sx={{objectFit: "contain",height:"100px",width:"100px",borderRadius:"5px"}}
                />
                <Typography sx={{ fontSize: "24px", color: "#0D1C2E", fontWeight: "900", fontStyle: "normal"}}>
                   SiteSii
                </Typography>
                
                </Stack>
               
                <Box sx={{ display: "flex", flexDirection: "column",width:{
                    lg:"100%",
                    xs:"90%"
                },marginTop:"40px",px:"10px"}}>
                    <TextField
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        id="outlined-required"
                        label="Email"
                        type={"email"}
                        color={"primary"}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailOutlinedIcon htmlColor={colors.appPrimary} />
                                </InputAdornment>
                            )
                        }}
                        sx={styles.input}
                    />
                    <TextField
                        value={pass}
                        onChange={(event) => setPass(event.target.value)}
                        id="outlined-required"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        color={"primary"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        //  onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {
                                            showPassword ?
                                                <VisibilityOff htmlColor={colors.appPrimary} />
                                                :
                                                <Visibility htmlColor={colors.appPrimary} />
                                        }
                                    </IconButton>
                                </InputAdornment>
                            ),
                            startAdornment: (
                                <InputAdornment position="end" >
                                    <LockOutlinedIcon htmlColor={colors.appPrimary} />
                                </InputAdornment>
                            )
                        }}
                        sx={styles.input}
                    />
                    <Button variant="contained" 
                        disabled={loading}
                        onClick={()=>deleteAccount()}
                        sx={{backgroundColor:"red",marginTop:"40px",'&:hover': {
                            backgroundColor: "red" // Change to red on hover as well
                          }}}>
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Delete Account"}
                    </Button>
                    <Typography textAlign={"center"} mt={5}>
                        -------------  or  -------------
                    </Typography>
                    <Stack direction={"row"} spacing={5} width={"100%"} alignItems={"center"} justifyContent={"center"} mt={3}>
                        <IconButton>
                            <CardMedia
                                onClick={googleSignin}
                                component={"img"}
                                src={images.google}
                                sx={{objectFit: "contain",height:"30px",width:"30px",borderRadius:"5px"}}
                            />
                        </IconButton>
                        {/* <IconButton>
                            <CardMedia
                                onClick={appleSignin}
                                component={"img"}
                                src={images.apple}
                                sx={{objectFit: "contain",height:"30px",width:"30px",borderRadius:"5px"}}
                            />
                        </IconButton> */}
                        {/* <IconButton>
                            <CardMedia
                                component={"img"}
                                src={images.phone}
                                sx={{objectFit: "contain",height:"30px",width:"30px",borderRadius:"5px"}}
                            />
                        </IconButton> */}
                    </Stack>
                    {/* <Typography sx={{textAlign:"center",my:"10px"}} >OR</Typography>
                    <Button variant="contained" color="success" style={styles.loginBtn} onClick={()=>handleLogIn("Breeders")} disabled={props.loginLoading}>
                      LogIn As Breeder
                      {props.loginLoading&&isBreeder&&<CircularProgress sx={{color:"white",marginLeft:"10px"}} size={20}/>}
                    </Button> */}
                </Box>
            </Grid>
            <ConfirmationDialog isOpen={isOpen} handleClose={()=>setIsOpen(false)}/>
        </Grid>
    )
}
export default Login
const styles = {
    input:{
        marginY:"20px"
    }
}