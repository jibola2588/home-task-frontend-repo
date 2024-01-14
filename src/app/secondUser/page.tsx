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


interface UserData {
  name: string;
  users: string;
  products: string;
  percentage: string;
  id:string;
  timeStamp:any
}

export default function SecondUser(){ 
    const router = useRouter()

    const handleLogout = () => { 
     router.push('/')
     localStorage.clear();
    }

    const [showImg,setShowImg] = useState(false)

    const [file, setFile] = useState<File | null>(null);
    const [user, setUser] = useState<UserData | null>(null);
    const [data, setData] = useState({});
    const [per, setPerc] = useState<number | null>(null);
    const [loading,setLoading] = useState(false)
    const [alert,setAlert] = useState(false)

    const fetchData = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const list: UserData[] = [];
        // querySnapshot.forEach((doc) => {
        //   list.push({ id: doc.id, ...doc.data() } as UserData);
        // });
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() } as UserData);
        });
    
        // Sort the array based on the timestamp in descending order
        
        list.sort((a, b) => b.timeStamp.toDate() - a.timeStamp.toDate());
        console.log('list is',list)
        setLoading(false);
        if (list.length > 0) {
          setUser(list[0]);
        }
      } catch (err) {
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);

    useEffect(() => {
      const uploadFile = () => {
        if (file) {
          const name = new Date().getTime() + file.name;
  
          // console.log(name);
          // console.log('storage is',storage);
          const storageRef = ref(storage, file.name);
          const uploadTask = uploadBytesResumable(storageRef, file);
  
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              if(progress == 100){
                setTimeout(() => { 
                  setAlert(true)
                  // console.log('alert is here')
                },1000)
              }
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
    // console.log('data is here',user)
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
              <span>
              { per === 100 && alert &&
            <div role="alert" className="rounded border-s-4 border-green-500 bg-green-50 p-4">
            <strong className="block font-medium text-green-800">image upload is {per} % complete</strong>
          </div>
         }

              </span>
             
                </div>
                <div className='right'>
                    <div className='flex justify-end'>
                        {/* <button className='bg-black text-white text-sm rounded-md py-2 px-3 text-center'>Show details</button> */}
            <span className='w-[8rem]'>
             <Button 
             label={showImg ? 'Hide details' : 'Show details'}
             size='small'
             color='black'
             customclassname='bg-black text-white mt-2'
             onClick={toggleDetails}
             />
             </span>
                    </div>
                   {showImg  && <div className='p-2'>
                        <Heading3 
                        label='Details for user A'
                        classname='text-center'
                        />
                        { 
                         loading ? <p>fetching data...</p> :(
                          <div className='mt-2 space-y-2'>
                          <div className='flex items-center gap-1'>
                             <span>Company name: </span>
                             <span className='text-base font-semibold uppercase'>{ user?.name}</span>
                          </div>
                          <div className='flex items-center  gap-1'>
                             <span>Number of users : </span>
                             <span className='text-base font-semibold uppercase'>{user?.users}</span>
                          </div>
                          <div className='flex items-center gap-1'>
                             <span>Number of product : </span>
                             <span className='text-base font-semibold uppercase'>{user?.products}</span>
                          </div>
                          <div className='flex items-center  gap-1'>
                             <span>Percentage : </span>
                             <span className='text-base font-semibold uppercase'>{user?.percentage}</span>
                          </div>
                         </div>
                         )
                        }
                       
                    </div>}
                </div>
            </section>
        </div>
    )
}







 
  


