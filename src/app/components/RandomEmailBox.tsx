const RandomEmailBox = ({value}: any) => {
  return (
    <>
      <input className="mailtitle xl:w-[1/3] lg:w-[1/5] md:w-[1/4] sm:w-[1/2] w-[65%] h-12 p-5 rounded-full overflow-hidden outline-none border border-blue-900 shadow-md" value={!value?"loading..":value} readOnly>

      </input>
    </>
  )
}

export default RandomEmailBox
