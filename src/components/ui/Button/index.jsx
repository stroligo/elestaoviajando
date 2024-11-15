import PropTypes from 'prop-types';

export function Button(props) {
  return (
    <button
      {...props}
      className="px-3 py-2 hover:text-white hover:bg-orange h-fit bg-yellow text-sm font-semibold text-blue-dark rounded-lg transition-all duration-150 ease-in-out"
    >
      {props.children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
};
