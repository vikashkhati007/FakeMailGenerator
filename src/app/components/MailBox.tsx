import Image from "next/image";
const MailBox = ({ email, subject, message, time }: any) => {
  return (
    <>
        <div className="mailboxcontainer hover:bg-[#0099FF] hover:bg-opacity-20 hover:cursor-pointer border border-blue-100 border-l-2 border-l-[#0099FF] h-fit m-5 p-2 ">
          <span className="text-xs opacity-70 font-medium">{email}</span>
          <p className="text-sm font-medium">{subject}</p>
          <div className="w-full flex justify-between">
            <span className="text-[12px] opacity-70 font-medium">
              {message}
            </span>
            <p className="text-xs opacity-70 font-medium">{time}</p>
          </div>
        </div>
    </>
  );
};

export default MailBox;
