import Logo from '/assets/img/logo.png';
export function Hero() {
  return (
    <section>
      <div className="bg-beige p-5 flex justify-between">
        <figure className="w-24">
          <img src={Logo} alt="Logo" />
        </figure>
        <div>
          <div className="text-xl font-serif leading-none">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem
            distinctio eligendi cupiditate placeat nesciunt pariatur optio,
            libero consequuntur. Id maxime obcaecati eveniet nam culpa, deleniti
            voluptatem rem quibusdam atque suscipit?
          </div>
        </div>
      </div>
    </section>
  );
}
