"use client"

import { Card, Separator } from "@heroui/react";
import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";


 
 const signuppage = () => {

    const onSubmit = async(e)=>{
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget)
        const user = Object.fromEntries(formData.entries())
       // console.log(user);
       const {data,error} = await authClient.signUp.email({
        name:user.name,
        email:user.email,
        password:user.password,
        image:user.image

       })
       if(data){
        await authClient.signOut();
        redirect('/login')
       }
       if(error){
        alert("error")
       }

    }

    const handlesocialsignIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
};


    return (
        <div className="max-w-7xl mx-auto ">
            <div className="text-center my-4">
                <h1 className="text-2xl font-bold">Create A Account</h1>
                <p>start lerning with studyNook</p>

            </div>
            <Card className="border max-w-105 mx-auto p-5">
                 <Form onSubmit={onSubmit}  className="flex  w-96 flex-col gap-4">
         


       <TextField
        
        name="name"
        type="text"
        
      >
        <Label>Name</Label>
        <Input placeholder="enter your name" />
        <FieldError />
      </TextField>


    <TextField
        
        name="image"
        type="url"
        
      >
        <Label>image Url</Label>
        <Input placeholder="enter image url" />
        <FieldError />
      </TextField>




      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }
          return null;
        }}
      >
        <Label>Email</Label>
        <Input placeholder="enter a email address" />
        <FieldError />
      </TextField>
      <TextField
        isRequired
        minLength={8}
        name="password"
        type="password"
        validate={(value) => {
          if (value.length < 8) {
            return "Password must be at least 8 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
          }
          return null;
        }}
      >
        <Label>Password</Label>
        <Input placeholder="Enter your password" />
        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
        <FieldError />
      </TextField>


      <div className="flex gap-2">
        <Button  className={' w-full flex justify-center'} type="submit">
        
          Sign Up
        </Button>
       
      </div>
    </Form>

         <div className="flex items-center gap-3 w-96 mx-auto my-4">
         <Separator className="flex-1" />
         <span className="whitespace-nowrap">or sign up with</span>
         <Separator className="flex-1" />
         </div>
    
        <div>
          <Button onClick={handlesocialsignIn} variant="outline"  className="w-full"> <FcGoogle></FcGoogle> Login with Google</Button>
        </div>
        <div className="text-center"><p>alrady  have an account ? <Link href={'/login'}><button className="text-blue-800">Login Now</button></Link></p></div>
    

            </Card>

            
        </div>
    );
 };
 
 export default signuppage;