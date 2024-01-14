'use client'

import Button from "@/components/button";
import Input from "@/components/input";
import Label from "@/components/text/label";
import { useEffect, useState } from 'react';
import useForm from '@/utils/useForm';
import { useRouter } from 'next/navigation'
import { collection, addDoc, serverTimestamp,setDoc,doc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../utils/firebase'

interface UserData {
  uid: string;
}

export default function Home(){
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    const [percentage, setPercentage] = useState<string>('');
    const [success,setSuccess] = useState(false)
    const [ermsg,setErmsg] = useState('')
    const [data, setData] = useState< UserData | null>(null);
 

    const handleLogout = () => { 
     router.push('/')
     localStorage.clear();
    }

    useEffect(() => {
      const data = localStorage.getItem('user');
      if (data) {
        const userData: UserData = JSON.parse(data);
        console.log('user is', userData);
        setData(userData)
      }
    }, []);

    const { handleChange, handleSubmit, inputs,resetForm } = useForm(
        {
          email:'',
          password: '',
          name:'',
          users:'',
          products:''
        },
       async () => {
         if(!(name && users && products && percentage)){ 
             setErmsg('missing field found')
             return
         } 
        try{
          setIsLoading(true)
          const {name,users,products} = inputs;
          console.log('inputs',inputs)
          const res =  await addDoc(collection(db, "users"), {
             name,percentage,users,products,
              timeStamp:serverTimestamp()
            });
            setIsLoading(false)
            setSuccess(true)
            setTimeout(() => { 
              setSuccess(false)
            },2000)

            console.log('res is here',res)
            resetForm();

            // console.log('details is here',{name,users,products,percentage})

        }catch(err){ 
            console.log(err)
            setIsLoading(false)
            setErmsg('Request failed')
        }
        })

      
        const {name,users,products} = inputs;

        useEffect(() => { 
          
           console.log('inputs,',{users,products})
        
          let num1:number = Number(users)
          let num2:number = Number(products)

          if (!isNaN(num1) && !isNaN(num2) && num2 !== 0) {
            const result = (num1 / num2) * 100;
            const total = `${result.toFixed(2)}%`;
            setPercentage(total);
          } else {
            setPercentage('');
          }
        }, [users, products]);

        useEffect(() => { 
        setErmsg('')
        },[name,users,products])
      
    
    return( 
        <main>
            <nav className="bg-grey-600 flex p-4 items-center justify-between border-b border-silver"> 
                <h4>Welcome user A</h4>
                <span className='w-[6rem] mt-2'>
             <Button 
             label='Sign out'
             size='small'
             color='danger'
             onClick={handleLogout}
             />
             </span>
            </nav>
            <section className="mx-auto max-w-[500px] mt-6 border shadow-md p-6"> 
            { success &&
            <div role="alert" className="rounded border-s-4 border-green-500 bg-green-50 p-4">
            <strong className="block font-medium text-green-800">Success</strong>
          
            <p className="mt-2 text-sm text-green-700">
            The user data has been successfully registered in the database.
            </p>
          </div>
         }
         { 
           ermsg &&  <div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4">
           <strong className="block font-medium text-red-800"> Error </strong>
         
           <p className="mt-2 text-sm text-red-700">
           {ermsg}
           </p>
         </div>
         } 
            <form onSubmit={handleSubmit} className="space-y-3"> 
           <div className="flex flex-col gap-2 ">
          <Label label="Company name" />
          <Input
            type="text"
            label="Enter your company name"
            name="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </div>
           <div className="flex flex-col gap-2 ">
          <Label label="Number of users" />
          <Input
            type="text"
            label="Enter number of users"
            name="users"
            value={inputs.users}
            onChange={handleChange}
          />
        </div>
           <div className="flex flex-col gap-2 ">
          <Label label="Number of products" />
          <Input
            type="text"
            label="Enter number of products"
            name="products"
            value={inputs.products}
            onChange={handleChange}       
          />
        </div>
           <div className="flex flex-col gap-2 ">
          <Label label="Percentage" />
          <Input
            type="text"
            label=""
            name=""
           value={percentage}
            readOnly
            parentClassName="bg-grey-600 cursor-not-allowed"
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
        </main>
    )
}