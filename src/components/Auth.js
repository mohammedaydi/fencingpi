import "./Auth.css";

const Auth = (props) => {
  return (
    <div className="form-container">
      <form onSubmit={props.handler}>
        <input onChange={props.onChange} value={props.value} />
        <button type="submit">Enter</button>
      </form>
    </div>
  );
};

export default Auth;
