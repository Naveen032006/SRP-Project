
import { Issuesview } from '../Issuebox/issueboxfull';
import OverHeader from './OverHeader'
import { Smallboxview } from '../Smallbox/smallboxfull';



const OverView=({user})=>{
    console.log("Inside Overview");
    const oStyle={maxHeight:"550px",overflowY:"scroll"}
    return(
        <div style={oStyle}>
        <div style={{display:"flex",justifyContent:"center",fontSize:"20px"}}><OverHeader title={user} /></div>
        <Smallboxview/>
        <Issuesview/>
        </div>

    )
}
export default OverView;