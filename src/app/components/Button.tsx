import Image from "next/image"
const Button = ({label, imgsrc, onClick}:any) => {
  return (
    <>
      <button onClick={onClick} className="button w-40 h-10 rounded-md bg-white flex justify-around items-center">
       {label}
        <Image src={imgsrc} width={25} height={2} alt=""/>
      </button>
    </>
  )
}

export default Button
