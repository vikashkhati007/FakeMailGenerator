import Image from "next/image"
const MailBox = () => {
  return (
    <>
      <div className="w-1/2 h-[90%] border overflow-y-scroll overflow-x-hidden custom-scrollbar">
        <div className="mailboxtitle m-2 gap-2 flex justify-center items-center">
        <Image src={"/mail.png"} width={30} height={30} alt="mailbox" ></Image>
        <span className="inbox text-lg opacity-80">Inbox</span>
        </div>
        <div className="mailcontainer hover:bg-[#0099FF] hover:bg-opacity-20 hover:cursor-pointer border border-blue-100 border-l-2 border-l-[#0099FF] h-fit m-5 p-2 ">
            <span className="text-xs opacity-70 font-medium">gamerworld471@gmail.com</span>
            <p className="text-sm font-medium">790030 is your Otp Code ...</p>
            <div className="w-full flex justify-between">
            <span className="text-[12px] opacity-70 font-medium">gamerworld471@gmail.com</span>
            <p className="text-xs opacity-70 font-medium">23:10</p>
            </div>
        </div>
      </div>
    </>
  )
}

export default MailBox
