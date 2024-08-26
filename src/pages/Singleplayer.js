import Controlbox from "../components/Controlbox";
import Health from "../components/Health";
import "./Singleplayer.css";

const Singleplayer = () => {
  return (
    <div className="singleplayer-container">
      <Health />
      <Controlbox />
    </div>
  );
};

export default Singleplayer;
