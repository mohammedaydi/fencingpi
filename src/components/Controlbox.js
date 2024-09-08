import "./Controlbox.css";
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const Controlbox = (props) => {
  const actionsHandler = async (event) => {
    let extension;
    let forward_btn = document.getElementById("forwardBtn");
    let backward_btn = document.getElementById("backwardBtn");
    switch (event.target.id) {
      case "forwardBtn":
        forward_btn.disabled = true;
        forward_btn.style = "cursor: not-allowed; opacity: 0.5;";
        backward_btn.disabled = true;
        backward_btn.style = "cursor: not-allowed; opacity: 0.5;";
        extension = "forward";
        break;
      case "backwardBtn":
        backward_btn.disabled = true;
        backward_btn.style = "cursor: not-allowed; opacity: 0.5;";
        forward_btn.disabled = true;
        forward_btn.style = "cursor: not-allowed; opacity: 0.5;";
        extension = "backward";
        break;
      case "shieldBtn":
        extension = "shield";
        break;
      case "defendBtn":
        extension = "defend";
        break;
      case "highBtn":
        extension = "high";
        break;
      case "sideBtn":
        extension = "side";
        break;
    }
    let extension2 = "";
    if (props.pickedSide == 1) {
      //if black player
      extension2 = "2";
    }
    const response = await fetch(`${apiBaseUrl}/${extension}${extension2}`);
    console.log(`${apiBaseUrl}/${extension}${extension2}`);

    const response_data = await response.json();
    if (response.ok) {
      if (
        response_data.state === "moved_forward" ||
        response_data.state === "moved_backward"
      ) {
        forward_btn.disabled = false;
        forward_btn.style = "cursor: pointer;";
        backward_btn.disabled = false;
        backward_btn.style = "cursor: pointer;";
      }
      console.log(response_data);
    }
  };
  return (
    <div className="control-container">
      <div className="mobility-box">
        <div>
          <button id="forwardBtn" onClick={actionsHandler}>
            Forward
          </button>
        </div>
        <div>
          <button id="backwardBtn" onClick={actionsHandler}>
            Backwards
          </button>
        </div>
      </div>
      <div className="actions-box">
        <div className="actions-box__def">
          <div>
            <button id="shieldBtn" onClick={actionsHandler}>
              Shield
            </button>
          </div>
          <div>
            <button id="defendBtn" onClick={actionsHandler}>
              defend
            </button>
          </div>
        </div>
        <div className="actions-box__att">
          <div>
            <button id="highBtn" onClick={actionsHandler}>
              high
            </button>
          </div>
          <div>
            <button id="sideBtn" onClick={actionsHandler}>
              side
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controlbox;
