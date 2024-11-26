import PropTypes from 'prop-types';

export function Main({ children }) {
  return (
    <main className="flex-1 flex bg-beige">
      <article className="container mx-auto flex-1 py-10 flex flex-col bg-white px-5">
        {children}
      </article>
    </main>
  );
}

Main.propTypes = {
  children: PropTypes.node.isRequired,
};
