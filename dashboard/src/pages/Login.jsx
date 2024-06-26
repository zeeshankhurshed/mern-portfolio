import SpecilalLoadingButton from "./SpecilalLoadingButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { clearAllUserErrors, login } from "@/store/slice/userSlices";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, isAuthenticated, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    dispatch(clearAllUserErrors());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error); // Display error message using toast
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      navigate('/');
    }
  }, [dispatch, isAuthenticated, error, navigate]);

  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className="min-h-[100vh] flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <form className="grid gap-4" onSubmit={handleLogin}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/password/forgot"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {
              loading ? (
                <SpecilalLoadingButton content={"Logging In"} width="w-full" />
              ) : (
                <Button type="submit" className="w-full">
                  Login
                </Button>
              )
            }
          </form>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img src="/login.png" alt="Image" />
      </div>
    </div>
  );
}
  {/* <div className="flex items-center gap-4 md:grow-0 sm:ml-16 sm:mt-5">
        <img src={usre && user.avatar && user.avatar.url} alt="avatar" className="w-20 h-20 rounded-full max-[900px]:hidden" />
        <h2 className="text-4xl max-[900px]:text-2xl">
          welcome back, {user.fullName}
        </h2>

      </div> */}