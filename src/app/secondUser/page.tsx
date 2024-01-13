'use client'

import { useRouter } from 'next/navigation'
import React, { useState,useEffect } from 'react';
import Button from '@/components/button';
import Heading3 from '@/components/text/heading3';
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db, storage } from '../../utils/firebase';

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";



export default function SecondUser(){ 
    const router = useRouter()

    const handleLogout = () => { 
     router.push('/')
     localStorage.clear();
    }

    const [showImg,setShowImg] = useState(false)

    const [file, setFile] = useState<File | null>(null);
    const [data, setData] = useState({});
    const [per, setPerc] = useState<number | null>(null);

    useEffect(() => { 
    const fetchData = async () => { 
      const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});
    }
    },[])

    useEffect(() => {
      const uploadFile = () => {
        if (file) {
          const name = new Date().getTime() + file.name;
  
          console.log(name);
          console.log('storage is',storage);
          const storageRef = ref(storage, file.name);
          const uploadTask = uploadBytesResumable(storageRef, file);
  
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              setPerc(progress);
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
                default:
                  break;
              }
            },
            (error) => {
              console.log(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setData((prev) => ({ ...prev, img: downloadURL }));
              });
            }
          );
        }
      };
      uploadFile();
    }, [file]);
  
  
    const toggleDetails = () => { 
        setShowImg(!showImg)
    }
    const onClose = () => { 

    }
  
    return( 
        <div> 
            <nav className="bg-grey-600 flex p-4 items-center justify-between border-b border-silver"> 
                <h4>Welcome user B</h4>
                <span className='w-[6rem] mt-2'>
             <Button 
             label='Sign out'
             size='small'
             color='danger'
             onClick={handleLogout}
             />
             </span>
            </nav>
            <section className='max-w-[600px] mx-auto mt-6 flex justify-between border border-silver p-4 h-[300px]'>
                <div className='left w-[300px]'>
                <Heading3
            label={'Upload Image'}
            classname={'font-pro-display-medium text-[1.5rem] leading-[2rem] text-black mb-2'}
          />
             <div className="w-1/2">
           
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
              className="w-[150px] h-[150px] rounded-full object-cover"
            />
           
          </div>
          <div className="w-40 mt-1 pl-2">
                <label
                  htmlFor="file"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  Upload:{" "}
                  <MdOutlineDriveFolderUpload className="icon cursor-pointer" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) =>
                    e.target.files && setFile(e.target.files[0])
                  }
                  className="hidden"
                />
              </div>
             
                </div>
                <div className='right'>
                    <div className='flex justify-end'>
                        {/* <button className='bg-black text-white text-sm rounded-md py-2 px-3 text-center'>Show details</button> */}
            <span className='w-[8rem]'>
             <Button 
             label='Show details'
             size='small'
             color='black'
             customclassname='bg-black text-white mt-2'
             onClick={toggleDetails}
             />
             </span>
                    </div>
                   {showImg && <div className='p-2'>
                        <Heading3 
                        label='Details for user A'
                        classname='text-center'
                        />
                        <div className='mt-2 space-y-2'>
                         <div className='flex items-center justify-between'>
                            <span>Company name : </span>
                            <span>Ajibola</span>
                         </div>
                         <div className='flex items-center justify-between'>
                            <span>Number of users : </span>
                            <span>4</span>
                         </div>
                         <div className='flex items-center justify-between'>
                            <span>Number of product : </span>
                            <span>3</span>
                         </div>
                         <div className='flex items-center justify-between'>
                            <span>Percentage : </span>
                            <span>33%</span>
                         </div>
                        </div>
                    </div>}
                </div>
            </section>
        </div>
    )
}







 
  


