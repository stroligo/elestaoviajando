import Logo from '/assets/img/logo.png';
/**
 * Renders the hero section of the website.
 *
 * This component renders a background with a gradient color and a container with a child element that contains the text "Veja o mundo através da nossa janela.".
 * The text is centered and has a background color to make it more visible.
 * There is also an absolutely positioned image of the logo at the bottom right corner of the container.
 *
 * The component uses tailwindcss classes to style the elements.
 *
 * @returns {JSX.Element}
 */
export function Hero() {
  return (
    <div className="bg-gradient-to-r from-green to-beige p-5 relative flex justify-between h-[20vh]  md:h-[60vh]  overflow-hidden w-full mx-0">
      <div className="z-10 container mx-auto ">
        <div className="md:w-1/2 md:px-6 flex justify-center items-center h-full flex-col ">
          <div className="hero text-white ">
            Veja o mundo através da nossa janela.
          </div>
        </div>
      </div>
      <figure className=" absolute max-w-[600px] top-1/2  -right-10  -translate-y-1/2 bg-blue md:bg-transparent">
        <img src={Logo} alt="Logo" className=" opacity-5 md:opacity-50" />
      </figure>
    </div>
  );
}
