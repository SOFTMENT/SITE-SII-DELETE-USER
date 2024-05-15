import { Close } from "@mui/icons-material"
import { Box, Button, CircularProgress, Dialog, IconButton, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import colors from "../theme/colors"
import { useState } from "react"
import CircleIcon from '@mui/icons-material/Circle';
import { deleteAccountPoints } from "../config/appConfig"
import { auth, db } from "../config/firebase-config"
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify"
const ConfirmationDialog = (props) => {
    const {isOpen, handleClose} = props
    const [loading,setLoading] = useState(false)
    const handleConfirm = async() => {
        try {
            setLoading(true)
            const user = auth.currentUser;
             // Delete the corresponding document from Firestore
            await deleteDoc(doc(db, "Users", user.uid));
            // Delete the user account
            await user.delete();
            toast.success("Your account is deleted permanently!")
            setLoading(false)
            handleClose()
        } catch (error) {
            
        }
    } 
    return (
        <Dialog
            open={isOpen}
        >
            <Box sx={{backgroundColor:colors.backgroundColor}}>
                <Stack direction={"row"} justifyContent={"space-between"} 
                    sx={{backgroundColor:colors.appPrimary,padding:"20px"}}>
                    <Typography sx={{ fontSize: "30px", color: "white", fontWeight: "900", fontStyle: "normal" }}>
                        Confirm Account Deletion
                    </Typography>
                    <IconButton onClick={handleClose} size="large">
                        <Close htmlColor="white" />
                    </IconButton>
                </Stack>
                <Stack sx={{padding:"20px"}}>
                <Typography variant="h5">
                        By deleting your account, you will permanently erase this data:
                    </Typography>
                   <Stack my={2}>
                   {
                    deleteAccountPoints.map((item,index)=>{
                        return(
                            <Stack key={index} direction={"row"} alignItems={"center"}>
                                <CircleIcon
                                    sx={{ fontSize: 10 }} 
                                />
                                <Typography ml={1}>
                                    {item}
                                </Typography>
                            </Stack>
                        )
                    })
                   }</Stack> 
                    <Button  
                        variant="contained"
                        endIcon={loading?<CircularProgress size={20} sx={{color:"white"}}/>:null}
                        onClick={handleConfirm}
                        sx={{backgroundColor:"red",marginTop:"40px",'&:hover': {
                            backgroundColor: "red" // Change to red on hover as well
                          }}}>
                        Confirm
                    </Button>
                </Stack>
            </Box>
        </Dialog>
    )
}
export default ConfirmationDialog