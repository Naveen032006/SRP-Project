import Color from '../Color';
import { Authuse } from '../../context/Authcontext'; // ✅ correct import

const OverHeader = () => {
  const { UserId, role } = Authuse(); // ✅ from context, no props
  const hStyle = {
    backgroundColor: Color.primary,
    color: Color.secondary,
    width: "50%",
    margin: "20px",
    textAlign: "center",
    padding: "10px",
    borderRadius: "20px",
  };
  return (
    <div style={hStyle}>
      <h3>Welcome Back {UserId}</h3>
      {role === "user"
        ? <p>Thank you for making the city better</p>
        : <p>The hand that turns problems into peace</p>}
    </div>
  );
};

export default OverHeader;