import MessagePageBox from "../components/MessagePageBox";

const Page = async (e:any) => {
  const {searchParams} = e;
  const res = await fetch(`https://www.1secmail.com/api/v1/?action=readMessage&login=${searchParams.username}&domain=${searchParams.domain}&id=${searchParams.id}`);
  const messagedata = await res.json();
  //
  return (
   <>
    <MessagePageBox from={messagedata.from} subject={messagedata.subject} body={messagedata.textBody}/>
   </>
  );
}

export default Page;
