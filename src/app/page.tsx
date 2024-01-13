'use client'

import Input from '@/components/input';
import Label from '@/components/text/label';
import Icon from '@/components/icon';
import Heading3 from '@/components/text/heading3';
import { MdOutlineEmail } from "react-icons/md";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState,useEffect } from 'react';
import Button from '@/components/button';
import useForm from '@/utils/useForm';
import { useRouter } from 'next/navigation'
import {signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../utils/firebase'

/* eslint-disable */

export default function Home() {
  
  const router = useRouter()

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success,setSuccess] = useState(false)
  const [ermsg,setErmsg] = useState('')

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  

  const { handleChange, handleSubmit, inputs } = useForm(
    {
      email: '',
      password: '',
      name:'',
      users:'',
      products:''
    },
    () => {
     
      const { email, password } = inputs;

      if(!(email && password)){
        setErmsg('Input value is empty')
        return
      }

      if(!(email == 'testdemo@userA.com' ||  email == 'testdemo@userB.com')){
        setErmsg('invalid credentials') 
        return
      } 
      if(!(password == 'testuserA' ||  password == 'testuserB')){
        setErmsg('invalid credentials') 
        return
      } 
      setIsLoading(true)
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        // console.log('user is ',user)
        localStorage.setItem('user',JSON.stringify(user))
        setIsLoading(false)
        if (user.email === 'testdemo@usera.com' && password === 'testuserA') {
          setTimeout(()=> { 
            setSuccess(true)
            router.push('/firstUser');
          },500)
        } 

        if (user.email === 'testdemo@userb.com' && password === 'testuserB') {
          setSuccess(true)
          setTimeout(()=> { 
            router.push('/secondUser');
          },500)
        }
      })
      .catch((error) => {
        setIsLoading(false)
        console.log('err is',error.response)
        setErmsg('Network failed')
      });
    }
  );

  const { email, password } = inputs;

  useEffect(() => { 
  setErmsg('')
  },[email,password])

  return (
   <div className='h-screen w-full grid place-items-center'>
        <section className='shadow-md py-4 px-6 w-[30rem]'>  
         { success &&
            <div role="alert" className="rounded border-s-4 border-green-500 bg-green-50 p-4">
            <strong className="block font-medium text-green-800">Login successful </strong>
          
            <p className="mt-2 text-sm text-green-700">
              Redirecting ...
            </p>
          </div>
         }
         { 
           ermsg &&  <div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4">
           <strong className="block font-medium text-red-800"> Error</strong>
         
           <p className="mt-2 text-sm text-red-700">
             {ermsg}
           </p>
         </div>
         }
           <Heading3 
           label='Login'
           classname='text-center mb-4'
           />
           <form onSubmit={handleSubmit}> 
           <div className="flex flex-col gap-2 ">
          <Label label="Email" />
          <Input
            type="email"
            label="Enter your Email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            trailing={<Icon icon={MdOutlineEmail} className="h-4 w-4 text-gray-500" />}
          />
        </div>
           <div className="flex flex-col gap-2 mt-3">
          <Label label="Password" />
          <Input
      type={isPasswordVisible ? 'text' : 'password'}
      label="Enter your password"
      name="password"
      value={inputs.password}
      onChange={handleChange}
      trailing={
        <div
          className="cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? (
            <FaEyeSlash className="h-4 w-4 text-gray-500" />
          ) : (
            <FaEye className="h-4 w-4 text-gray-500" />
          )}
        </div>
      }
    />
        </div>
         <Button 
         label="Proceed"   
         color ="primary" 
         customclassname="mt-8" 
         loading={isLoading}

         />  
           </form>
        </section>
   </div>
  )
}
/* eslint-enable */