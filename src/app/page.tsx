"use client";
import Image from "next/image";
import Button from "./components/Button";
import MailBox from "./components/MailBox";
import RandomEmailBox from "./components/RandomEmailBox";
import Title from "./components/Title";
import { useState } from "react";
const Home = () => {
  const [refresh, setRefresh] = useState(false);
  return (
    <div className="w-[100%] h-screen custom-scrollbar overflow-y-scroll">
      <div className="uppercontainer w-full h-[60%] bg-[#0099FF] md:rounded-b-full sm:rounded-b-3xl flex flex-col justify-center items-center gap-7">
        <Title />
        <RandomEmailBox />
        <div className="buttoncontainer flex gap-5">
          <Button label={"Copy Email"} imgsrc={"/copyicon.png"} />
          <Button label={"Delete Email"} imgsrc={"/delete.png"} />
        </div>
      </div>
      <div className="w-full flex justify-center items-center mt-5">
        {!refresh ?
          <Image
            className="cursor-pointer"
            src={"/loadingarrowicon.png"}
            width={50}
            height={50}
            alt=""
            onClick={(()=>{setRefresh(true); setTimeout(()=>{setRefresh(false)},2000)})}
          />
         : 
        <div className="w-[50px] h-[50px] bg-[#0099FF] rounded-full flex justify-center items-center">
          <Image
            className="cursor-pointer"
            src={"/loadinganimation.svg"}
            width={40}
            height={40}
            alt=""
          />  
          </div>
        }
      </div>
      <div className="bottomcontainer w-full h-[80%] flex justify-center items-center">
        <MailBox />
      </div>
    </div>
  );
};

export default Home;
