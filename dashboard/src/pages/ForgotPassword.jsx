import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearAllForgotPasswordErrors, forgotPassword } from '../store/slice/fortgotResetPasswordSlice';
import SpecilalLoadingButton from './SpecilalLoadingButton';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { toast } from 'react-toastify'; // Ensure toast is imported

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { loading, error, message } = useSelector((state) => state.forgotPassword);
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleForgotPassword = (e) => {
    e.preventDefault(); // Prevent default form submission
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllForgotPasswordErrors());
    }
    if (isAuthenticated) {
      navigate("/");
    }
    if (message) { // Check if message is not null
      toast.success(message);
    }
  }, [dispatch, isAuthenticated, error, message, navigate]);

  return (
    <>
      <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
        <div className="min-h-[100vh] flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Forgot Password</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email to request password
              </p>
            </div>
            <form className="grid gap-4" onSubmit={handleForgotPassword}>
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
                    to="/login"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Remember your password?
                  </Link>
                </div>
              </div>
              {loading ? (
                <SpecilalLoadingButton content={"Requesting"} />
              ) : (
                <Button type="submit" className="w-full">
                  Request for Reset Password
                </Button>
              )}
            </form>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <img src="/forgot.png" alt="Image" />
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
