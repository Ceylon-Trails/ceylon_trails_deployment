import Logo from "../assets/Ceylon_trails_logo.png"


const Loading_page = () => {
  return (
    <div className="bg-base-500 flex-col h-screen flex justify-center items-center">
        <img className="h-50 sm:h-100 animate-pulse" src={Logo} alt="" />
        <label className="text-white text-2xl sm:text-4xl font-jaini animate-pulse" htmlFor="">Loading ...</label>
    </div>
  )
}

export default Loading_page