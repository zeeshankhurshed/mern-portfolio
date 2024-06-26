import React, { useEffect, useState } from 'react';
import SpecilalLoadingButton from './SpecilalLoadingButton';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { clearAllForgotPasswordErrors, resetPassword } from '../store/slice/fortgotResetPasswordSlice';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { loading, error, message } = useSelector((state) => state.forgotPassword);
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    dispatch(resetPassword(token, password, confirmPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllForgotPasswordErrors());
    }
    if (isAuthenticated) {
      navigate('/');
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, isAuthenticated, error, message, navigate]);

  return (
    <>
      <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
        <div className="min-h-[100vh] flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Reset Password</h1>
              <p className="text-balance text-muted-foreground">
                Set a new password
              </p>
            </div>
            <form className="grid gap-4" onSubmit={handleResetPassword}>
              <div className="grid gap-2">
                <Label>Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {loading ? (
                <SpecilalLoadingButton content={"Resetting Password"} />
              ) : (
                <Button type="submit" className="w-full">
                  Reset Password
                </Button>
              )}
            </form>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <img src="/reset.png" alt="Image" />
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
