import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";

function LoginRegisterPage(props) {
  return (
    <>
    <h2>Please sign in to track your finances</h2>
    <div className="row">
      <div className="col">
        <LoginForm></LoginForm>
      </div>
      <div className="col">
        <RegisterForm></RegisterForm>
      </div>
    </div>
    
    </>
  )
}

export default LoginRegisterPage;
