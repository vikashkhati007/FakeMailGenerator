const MessagePageBox = ({ from, subject, body }: any) => {
  return (
    <div className="w-full h-fit overflow-hidden bg-[#0099FF] flex justify-center items-center">
      <div className="w-4/5 md:w-3/4 lg:w-2/3 h-fit bg-white rounded-2xl shadow-md p-6 overflow-y-auto overflow-x-hidden m-10">
        <div className="mb-6">
          <p className="text-sm opacity-70 font-medium">
            <span className="font-bold">From:</span>{" "}
            <span className="break-words">{from}</span>
          </p>
        </div>
        <hr className="my-6" />
        <div className="mb-6">
          <p className="text-lg opacity-70 font-medium">
            <span className="font-bold">Subject:</span>{" "}
            <span className="break-words">{subject}</span>
          </p>
        </div>
        <hr className="my-6" />
        <div>
          <p className="text-base opacity-70 font-medium">
            <span className="font-bold">Body:</span>{" "}
            <span className="break-words">{body}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessagePageBox;
