import PropTypes from 'prop-types';

export function Button(props) {
  return (
    <button
      {...props}
      className="px-3 py-1 text-sm text-nowrap md:text-lg  hover:bg-teal h-fit bg-blue-dark  font-semibold text-white hover:shadow-lg hover:text-white rounded-lg transition-all duration-150 ease-in-out"
    >
      {props.children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
};
