"use client";
import Image from "next/image";
import Button from "./components/Button";
import MailBox from "./components/MailBox";
import RandomEmailBox from "./components/RandomEmailBox";
import Title from "./components/Title";
import { useState, useEffect } from "react";
import About from "./components/About";
import Link from "next/link";
const Home = () => {
  const [refresh, setRefresh] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessageData] = useState([]);
  useEffect(() => {
    async function getEmail() {
      const res = await fetch(
        "https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1"
      );
      const randomemail = await res.json();
      setEmail(randomemail);
      const email = randomemail[0];
      const atIndex = email.indexOf("@");
      const username = email.substring(0, atIndex);
      const domain = email.substring(atIndex + 1);
      setInterval(async()=>{
        if(refresh){
          const res2 = await fetch(
            `https://www.1secmail.com/api/v1/?action=getMessages&login=${username}&domain=${domain}`
          );
          const messagedata = await res2.json();
          setMessageData(messagedata);
        }
        const res2 = await fetch(
          `https://www.1secmail.com/api/v1/?action=getMessages&login=${username}&domain=${domain}`
        );
        const messagedata = await res2.json();
        setMessageData(messagedata);
      },100);
 
      
     
    }
    getEmail();
  }, []);



  return (
    <div className="w-[100%] h-screen custom-scrollbar overflow-y-scroll">
      <div className="uppercontainer w-full h-[60%] bg-[#0099FF] md:rounded-b-full sm:rounded-b-3xl flex flex-col justify-center items-center gap-7">
        <Title />
        <RandomEmailBox value={email} />
        <div className="buttoncontainer flex gap-5">
          <Button label={"Copy Email"} imgsrc={"/copyicon.png"} />
          <Button label={"Delete Email"} imgsrc={"/delete.png"} />
        </div>
      </div>
      <div className="w-full flex justify-center items-center mt-5">
        {!refresh ? (
          <Image
            className="cursor-pointer"
            src={"/loadingarrowicon.png"}
            width={50}
            height={50}
            alt=""
            onClick={() => {
              setRefresh(true);
              setTimeout(() => {
                setRefresh(false);
              }, 2000);
            }}
          />
        ) : (
          <div className="w-[50px] h-[50px] bg-[#0099FF] rounded-full flex justify-center items-center">
            <Image
              className="cursor-pointer"
              src={"/loadinganimation.svg"}
              width={40}
              height={40}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="bottomcontainer w-full h-[80%] flex justify-center items-center">
      <div className="w-[80%] h-[90%] border rounded-md overflow-y-scroll overflow-x-hidden custom-scrollbar border-[#000000] border-opacity-20 shadow-md">
        <div className="mailboxtitle m-2 gap-2 flex justify-center items-center">
          <Image src={"/mail.png"} width={30} height={30} alt="mailbox"></Image>
          <span className="inbox text-lg opacity-80">Inbox</span>
        </div>
          {
            message.map((d:any)=>{
              return(
                <>
                <Link href={{ pathname: '/messagebox', query: { id: d.id, email } }}>
                <MailBox email={d.from} subject={d.subject} time={d.date}/>
                </Link>
                </>
              )
            })

          }
      </div>

      </div>
      <div className="bottomcontainer w-full h-fit flex justify-center items-center">
        <About />
      </div>
    </div>
  );
};

export default Home;
