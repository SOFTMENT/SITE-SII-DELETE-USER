import { AddCircleOutline } from "@mui/icons-material"
import { AppBar, Box, CardMedia, Icon, IconButton, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import images from "../../assets/images"

const Header = () => {
    const navigate = useNavigate()
    const handleAdd = () => {
        navigate("/add-bar")
    }
    return(
        <AppBar
            position="sticky"
            sx={{height:"100px",px:"80px",py:"10px",backgroundColor:"#010135"}}
        >
           <Box sx={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
            <Link style={{textDecoration:"none",color:"inherit"}} to="/">
            <Box sx={{display:"flex",flexDirection:"row",alignItems:"center"}}
            >
                <CardMedia component={"img"} src={images.logo} sx={{width:"70px",height:"70px",objectFit:"contain"}}/>
                <Typography variant="h5" sx={{marginLeft:"20px"}}>
                    {"Hello Admin"}
                </Typography>
            </Box>
            </Link>
            <IconButton size="medium" onClick={handleAdd}>
                <AddCircleOutline htmlColor="white" sx={{width:"30px",height:"30px"}}/>
            </IconButton>
           </Box>
        </AppBar>
    )
}
export default Header