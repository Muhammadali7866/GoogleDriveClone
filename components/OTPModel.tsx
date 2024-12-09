import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import React, { useState } from "react"
import Image from "next/image"
import { sendEmailOTP, verifySecret } from "@/lib/actions/user.actions"
import Router from "next/navigation"
import { useRouter } from "next/navigation"


export default function OtpModel ({email,accountId}:{
    email:string,
    accountId:string
}){
    const [isOpen,setIsOpen] = useState(true)
    const [password,setPassword] = useState("")
    const [isLoading,setIsLoading] = useState(false)

    const router = useRouter()

    const handleSubmit = async(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        setIsLoading(true);
        try {
            // call API to verify OTP
            const sessionId = await verifySecret({accountId,password})
            if(sessionId) router.push("/")
        } catch (error) {
            console.log("Failed to verify OTP:",error);
            
        }
        setIsLoading(false)
    }
const handleResentOtp = async()=>{
    await sendEmailOTP({email})
}
const handleCancelRequest = async ()=>{}
    return(
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
  <AlertDialogContent className="shad-alert-dialog">
    <AlertDialogHeader className="relative flex justify-center">
      <AlertDialogTitle className="h2 text-center">Enter Your OTP
        <Image src="/assets/icons/close-dark.svg" alt="close" width={20} height={20} onClick={()=>setIsOpen(false)} className="otp-close-button"/>
      </AlertDialogTitle>
      <AlertDialogDescription className="subtitle-2 text-center text-ligt-100">
        We have send a code to <span className="pl-1 text-brand">{email}</span>
      </AlertDialogDescription>
    </AlertDialogHeader>
    <InputOTP maxLength={6} value={password} onChange={setPassword}>
  <InputOTPGroup className="shad-otp">
    <InputOTPSlot index={0} className="shad-otp-slot" />
    <InputOTPSlot index={1} className="shad-otp-slot" />
    <InputOTPSlot index={2} className="shad-otp-slot" />
    <InputOTPSlot index={3} className="shad-otp-slot" />
    <InputOTPSlot index={4} className="shad-otp-slot" />
    <InputOTPSlot index={5} className="shad-otp-slot" />
  </InputOTPGroup>
</InputOTP>

    <AlertDialogFooter>
        <div className="flex flex-col gap-4 w-full "> 
      <AlertDialogAction onClick={handleSubmit} className="shad-submit-btn h-12" type="submit">Submit

       { isLoading && <Image src="/assets/icons/loader.svg" alt="loader" width={24} height={24} className="ml-2 animate-spin"/>}
      </AlertDialogAction>
      <div className="subtitle-2 mt-2 text-center"> Didnt get the code
            <button type="button" className="pl-1 text-brand" onClick={handleResentOtp}>
Click to resend
            </button>
        </div>
        </div>
        
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    )
}