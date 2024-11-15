import Logo from '/assets/img/logo.png';
export function Hero() {
  return (
    <section>
      <div className="bg-beige p-5 flex justify-between">
        <figure className="w-24">
          <img src={Logo} alt="Logo" />
        </figure>
        <div>TEXTO</div>
      </div>
    </section>
  );
}
