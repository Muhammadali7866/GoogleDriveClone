"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import Image from "next/image";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Link from "next/link"

 
  type FormType = "sign-in" | "sign-up";

  const authFormSchema = (formType: FormType) => {
    return z.object({
      email: z.string().email(),
      fullName:
        formType === "sign-up"
          ? z.string().min(2).max(50)
          : z.string().optional(),
    });
  };
export default function AuthForm({type}:{

    type:FormType
}){

// define states
const [isLoading,setIsLoading] = useState(false)
const [errorMessage,setErrorMessage] = useState("")

    // 1. Define your form.
    const formSchema = authFormSchema(type);
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        fullName: "",
        email: "",
      },
    });
 
  // 2. Define a submit handler.
  const  onSubmit=  async(values: z.infer<typeof formSchema>)=> {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)

  }
  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
        <h1 className="form-title">{type === "sign-in"?"Sign In":"Sign Up"}</h1>
        {type === "sign-up" && (
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
                <div className="shad-form-item">

              <FormLabel className="shad-form-label">Full name</FormLabel>
              <FormControl>
                <Input className="shad-input" placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage className="shad-form-message" />
                </div>
            </FormItem> 
          )}
        />
        
    )}
     <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
                <div className="shad-form-item">

              <FormLabel className="shad-form-label">Email</FormLabel>
              <FormControl>
                <Input className="shad-input" placeholder="Enter your email Address" {...field} />
              </FormControl>
              <FormMessage className="shad-form-message" />
                </div>
            </FormItem> 
          )}
        />
        <Button type="submit" className="form-submit-button" disabled={isLoading}>{type === "sign-in"?"Sign In":"Sign Up"}
            {isLoading && (

                <Image src="/assets/icons/loader.svg" width={24} height={24} alt="loading" className="ml-2 animate-spin" />
            )
            
            }
        </Button>
        {errorMessage && (
          <p className="error-message">*{errorMessage}</p>
        )}
        <div className="body-2 flex justify-center">
          <p className="text-light-100">{type === "sign-in"?"Dont,t have an account":"Already have an account"}</p>
          <Link className="ml-1 font-medium text-brand" href={type === "sign-in" ? "/sign-up" : "/sign-in"}>
  {type === "sign-in" ? "sign-up" : "sign-in"}
</Link>
        </div>
      </form>
    </Form>
    {/* OTP verification */}
    </>
  )}