
const Navbar = () => {
  return (
    <div className="bg-primary flex p-5 flex-col md:flex-row justify-between items-center">
      <h2 className="text-3xl text-white">Bondify</h2>
      <ul className="flex gap-3 text-white text-2xl mb-2">
        <li className="hover:underline cursor-pointer transition-all duration-300 ease-in-out">About</li>
        <li className="hover:underline cursor-pointer transition-all duration-300 ease-in-out">Downlaod</li>
        <li className="hover:underline cursor-pointer transition-all duration-300 ease-in-out">Priavcy</li>
      </ul>
      <button className="text-2xl text-black px-5 py-1 rounded-full bg-white hover:bg-black hover:text-white transition-all duration-500">Log In</button>
    </div>
  )
}

export default Navbar