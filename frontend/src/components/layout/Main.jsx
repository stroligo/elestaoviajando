import PropTypes from 'prop-types';

export function Main({ children }) {
  return (
    <main className="flex-1 flex bg-beige">
      <article className="flex-1  flex flex-col bg-white">{children}</article>
    </main>
  );
}

Main.propTypes = {
  children: PropTypes.node.isRequired,
};
