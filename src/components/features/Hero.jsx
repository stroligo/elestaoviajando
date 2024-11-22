import Logo from '/assets/img/logo.png';
export function Hero() {
  return (
    <div className="bg-gradient-to-r from-green to-beige p-5 relative flex justify-between  md:h-[50vh] rounded-lg overflow-hidden w-full mx-0">
      <div className="z-10">
        <div className="md:w-1/2 md:px-6 flex justify-center items-center h-full flex-col ">
          <div className="hero text-white ">
            Veja o mundo através da nossa janela.
          </div>
        </div>
      </div>
      <figure className=" absolute max-w-[600px] top-1/2  -right-10  -translate-y-1/2">
        <img src={Logo} alt="Logo" className="opacity-10 md:opacity-50" />
      </figure>
    </div>
  );
}
