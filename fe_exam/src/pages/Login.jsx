import { useState } from "react";
import { useLogin } from "../shared/dao/loginDao";
import { Input } from "../components/Input";
import Button from "../components/Button";

function Login() {
  const Login = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    await Login.mutateAsync({ email, password });
  };

  return (
    <>
      <div className="bg-gray-100 flex justify-center items-center h-screen">
        <div className="w-1/2 h-screen hidden lg:block">
          <img
            src="https://placehold.co/800x/667fff/ffffff.png?text=Calendar+App+Login&font=Montserrat"
            alt="Calendar App"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <h1 className="text-2xl font-semibold mb-4 lg:hidden">
            Calendar App Login
          </h1>
          <Input value={email} label="Email" onChange={setEmail} />
          <Input
            value={password}
            label="Password"
            onChange={setPassword}
            type="password"
          />
          <Button value="Login" type="submit" onClick={handleSubmit} />
        </div>
      </div>
    </>
  );
}

export default Login;
