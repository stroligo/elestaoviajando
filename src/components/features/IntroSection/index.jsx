import PropTypes from 'prop-types';
import StyleModule from './style.module.css';

export function IntroSection({ title, subtitle, style, customCss }) {
  return (
    <div
      className={`pb-8 pt-2 flex flex-col ${StyleModule[style]} ${
        typeof customCss === 'string' ? customCss : ''
      } `}
    >
      {title && <div className={StyleModule.title}>{title}</div>}
      {subtitle && <div className={StyleModule.subtitle}>{subtitle}</div>}
      <div className={StyleModule.bar}></div>
    </div>
  );
}

IntroSection.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  style: PropTypes.string,
  customCss: PropTypes.string,
};
