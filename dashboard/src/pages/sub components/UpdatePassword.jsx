import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'
import SpecilalLoadingButton from '../SpecilalLoadingButton'
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllUserErrors, getUser, resetProfile, updatePassword } from '@/store/slice/userSlices'
import { toast } from 'react-toastify'

const UpdatePassword = () => {
const {loading,error,isUpdated,message}=useSelector((state)=>state.user);
  const[currentPassword,setCurrentPassword]=useState("");
  const[newPassword, setNewPassword]=useState("");
  const[confirmNewPassword, setConfirmNewPassword]=useState("");
  
  
  const dispatch=useDispatch();
  const handleUpdatePassword=()=>{
    dispatch(updatePassword(currentPassword,newPassword,confirmNewPassword))
  }

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearAllUserErrors);
    }
    if(isUpdated){
      dispatch(getUser());
      dispatch(resetProfile());
    }
    if(message){
      toast.success(message);
    }
  },[dispatch,loading,error,isUpdated])
  return (
    <div className="w-full h-full p-6">
    <div className="grid gap-6">
      <div className="grid gap-2">
        <h2 className="text-3xl font-bold">Update Password</h2>
        <p className="my-5">Update Your Dashboard Password</p>
      </div>
    </div>
    <div className="grid gap-6">
      
      <div className="grid gap-2">
        <Label>Current Password</Label>
        <Input
          type="text"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) =>setCurrentPassword (e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label>New Passsword</Label>
        <Input
          type="text"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label>Confirm New Passsword</Label>
        <Input
          type="text"
          placeholder="Confirm Password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </div>
     
      <div className="grid gap-2">
        {!loading ? (
          <Button className="w-full" onClick={handleUpdatePassword}>
            Update Password
          </Button>
        ) : (
          <SpecilalLoadingButton content="updating" />
        )}
      </div>
    </div>
  </div>
  )
}

export default UpdatePassword

