import PropTypes from 'prop-types';

export function IntroSection({ title, subtitle, customCss }) {
  return (
    <div className={`pb-8 pt-2 flex flex-col ${customCss}`}>
      <div className="text-3xl font-serif uppercase text-gray-light font-light">
        {title}
      </div>
      <div className="text-5xl font-serif  uppercase text-blue-dark">
        {subtitle}
      </div>
      <div className="w-[100px] h-1 bg-orange"></div>
    </div>
  );
}

IntroSection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  customCss: PropTypes.string,
};
