"use client"

import { Card, Separator } from "@heroui/react";
import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FiGithub } from "react-icons/fi";
import Link from "next/link";


 
 const loginpage = () => {

    const onSubmit = async(e)=>{
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget)
        const user = Object.fromEntries(formData.entries())
       // console.log(user);
       const {data,error} = await authClient.signIn.email({
       
        email:user.email,
        password:user.password,
      

       })
       if(data){
        redirect('/')
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

// const handlesocialsignInGithub = async () => {
//   const data = await authClient.signIn.social({
//     provider: "github",
//   });
// };


    return (
        <div className="max-w-7xl mx-auto ">
            <div className="text-center my-4">
                <h1 className="text-2xl font-bold">Welcome Back</h1>
                <p>start your adventure with wanderlust</p>

            </div>
            <Card className="border max-w-105 mx-auto p-5">
                 <Form onSubmit={onSubmit}  className="flex  w-96 flex-col gap-4">
         

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
        
          Login
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

    <div className="text-center"><p>create an account ? <Link href={'/signUp'}><button className="text-blue-800">sign up</button></Link></p></div>
        


{/* 
      <div>
      <Button onClick={handlesocialsignInGithub} variant="outline"  className="w-full"> <FiGithub></FiGithub> Login with Github</Button>
    </div> */}



            </Card>

            
        </div>
    );
 };
 
 export default loginpage;