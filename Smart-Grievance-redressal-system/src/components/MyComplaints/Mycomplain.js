import { Box } from '@mui/material';
import Color from '../Color'
import { Header } from '../Basic/heading';
import './Mycomplain.css'
import { Mycomplainwrap } from './Mycomplaintwrap';
const Mycomplain=({user})=>{
    const mStyle={maxHeight:"550px",overflowY:"scroll"}
    return(
        < div style={mStyle}>
        
            <Header title="My Complaints" subtitle="Track your Submited Issue" showicon={true} user={user} />
            <form className="sbar"style={{backgroundColor:Color.primary,height:"100px",display:"flex",borderRadius:"20px",justifyContent:"center",maxWidth:"90%",overflowX:"auto",margin:"20px auto"}}>
                <input id="compid" placeholder='Enter complaint id'/> 
                <select id="options">
                    <option value="" selected disabled>--Select a category--</option>
                    <option value="Water Supply">Water Supply</option>
                    <option value="Road">Road</option>
                </select>
                <select id="status">
                    <option value="" selected disabled >--Select status--</option>
                    <option value="in progress">In progress</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>
                <select id="arrange">
                    <option value="" selected disabled >--Select order--</option>
                    <option value="Newest First">Newest First</option>
                    <option value="Oldest First">Oldest First</option>
                </select>
            </form>
            <Box sx={{overflowY:"auto"}}>
            <Mycomplainwrap user={user}/>
            </Box>
        </div>
    )
}
export default Mycomplain;