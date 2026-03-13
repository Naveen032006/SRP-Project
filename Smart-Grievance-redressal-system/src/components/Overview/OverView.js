import { Issuesview } from '../Issuebox/issueboxfull';
import OverHeader from './OverHeader';
import { Smallboxview } from '../Smallbox/smallboxfull';
// ✅ No props needed — children pull from context themselves

const OverView = () => {
  const oStyle = { maxHeight: "550px", overflowY: "scroll" };
  return (
    <div style={oStyle}>
      <div style={{ display: "flex", justifyContent: "center", fontSize: "20px" }}>
        <OverHeader /> {/* ✅ no title prop needed */}
      </div>
      <Smallboxview />
      <Issuesview />
    </div>
  );
};

export default OverView;