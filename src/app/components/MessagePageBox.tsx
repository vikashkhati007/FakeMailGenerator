const MessagePageBox = ({from, subject, body}:any) => {
  return (
    <div className="w-full h-screen bg-[#0099FF] flex justify-center items-center">
      <div className="mailboxcontainer w-4/5 md:w-3/4 lg:w-2/3 bg-white h-[80%] rounded-2xl overflow-y-scroll shadow-md p-6">
        <div className="mb-6">
          <p className="text-sm opacity-70 font-medium">
            <span className="font-bold">From:</span> {from}
          </p>
        </div>
        <hr className="my-6" />
        <div className="mb-6">
          <p className="text-lg opacity-70 font-medium">
            <span className="font-bold">Subject:</span> {subject}
          </p>
        </div>
        <hr className="my-6" />
        <div>
          <p className="text-base opacity-70 font-medium">
            <span className="font-bold">Body:</span> {body}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessagePageBox;
