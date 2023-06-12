import MessagePageBox from "../components/MessagePageBox";

const Page = async (e:any) => {
  const res = await fetch(`https://www.1secmail.com/api/v1/?action=readMessage&login=demo&domain=1secmail.com&id=${e.params.id}`);
  const messagedata = await res.json();
  console.log(e.params)
  return (
    <MessagePageBox/>
  );
}

export default Page;
