"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "./components/Button";
import MailBox from "./components/MailBox";
import RandomEmailBox from "./components/RandomEmailBox";
import Title from "./components/Title";
import About from "./components/About";
import MessagePageBox from "./components/MessagePageBox";

const Home = () => {
  const [refresh, setRefresh] = useState(false);
  const [del, setDelete] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessageData] = useState([]);
  const [username, setUsername] = useState("");
  const [domain, setDomain] = useState("");
  const [messageShow, setMessageShow] = useState(false);
  const [messageSubject, setMessageSubject] = useState("");
  const [messageFrom, setMessageFrom] = useState("");
  const [messageTextBody, setMessageTextBody] = useState("");

  useEffect(() => {
    async function getEmail() {
      const res = await fetch(
        "https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1"
      );
      const randomEmail = await res.json();
      setEmail(randomEmail);
      const email = randomEmail[0];
      const atIndex = email.indexOf("@");
      const username = email.substring(0, atIndex);
      setUsername(username);
      const domain = email.substring(atIndex + 1);
      setDomain(domain);

      const interval = setInterval(async () => {
        const res2 = await fetch(
          `https://www.1secmail.com/api/v1/?action=getMessages&login=${username}&domain=${domain}`
        );
        const messageData = await res2.json();
        setMessageData(messageData);
      }, 100);

      return () => {
        clearInterval(interval);
      };
    }

    getEmail();
  }, [del]);

  async function refreshMessage() {
    const res2 = await fetch(
      `https://www.1secmail.com/api/v1/?action=getMessages&login=${username}&domain=${domain}`
    );
    const messageData = await res2.json();
    setMessageData(messageData);
  }

  function copyToClipboard(email: any) {
    var input = document.createElement("input");
    input.value = email;
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(input);
  }

  function whichMessageClicked(d: any) {
    fetch(
      `https://www.1secmail.com/api/v1/?action=readMessage&login=${username}&domain=${domain}&id=${d.id}`
    )
      .then((res) => res.json())
      .then((messagedata) => {
        setMessageFrom(messagedata.from);
        setMessageTextBody(messagedata.textBody);
        setMessageSubject(messagedata.subject);
        setMessageShow(true);
      })
      .catch((error) => {
        console.log("Error reading message:", error);
      });
  }

  return (
    <div className="w-[100%] h-screen">
      <div className="uppercontainer w-full h-[60%] bg-[#0099FF] md:rounded-b-full sm:rounded-b-3xl flex flex-col justify-center items-center gap-7">
        <Title />
        <RandomEmailBox value={email} />
        <div className="buttoncontainer flex gap-5">
          <Button
            onClick={() => {
              copyToClipboard(email);
            }}
            label={"Copy Email"}
            imgsrc={"/copyicon.png"}
          />
          <Button
            onClick={() => {
              setDelete(!del);
            }}
            label={"Delete Email"}
            imgsrc={"/delete.png"}
          />
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
                refreshMessage();
              }, 1000);
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
          <div className="mailboxtitle flex m-2 gap-2 justify-center items-center">
            <Image src={"/mail.png"} width={30} height={30} alt="mailbox" />
            <span className="inbox text-lg opacity-80">{!messageShow?"Inbox": "Message Box"}</span>
          </div>
          {messageShow ? (
            <>
            <MessagePageBox
              from={messageFrom}
              subject={messageSubject}
              body={messageTextBody}
            />
            <div onClick={(()=>{setMessageShow(false)})} className="w-full bg-[#0099FF]">
            <Button label="Go Back" imgsrc="/arrow.png" className="border"></Button>
            </div>
            </> ) : (
            message.map((d: any) => (
              <div
                key={d.id}
                onClick={() => {
                  whichMessageClicked(d);
                }}
              >
                <MailBox email={d.from} subject={d.subject} time={d.date} />
              </div>
            ))
          )}
        </div>
      </div>
      <div className="bottomcontainer w-full h-fit flex justify-center items-center">
        <About />
      </div>
    </div>
  );
};

export default Home;
