import PropTypes from 'prop-types';
import { useState, useEffect, useCallback, useMemo } from 'react';
import style from './style.module.css';
import { Svg } from '../../../utils/Svg';

export function Select(props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFocus = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleClickOutside = useMemo(
    () => (event) => {
      if (!event.target.closest(`.${style.selectContainer}`)) {
        setIsOpen(false);
      }
    },
    [],
  );

  const handleMouseDown = useCallback(
    (event) => {
      event.preventDefault();
      handleFocus();
    },
    [handleFocus],
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className={`${style.selectContainer} relative`}>
      <select
        {...props}
        className={style.select}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {props.children}
      </select>
      <div
        className={`${style.icon} ${isOpen ? style.rotate : ''}`}
        onClick={handleFocus}
        onMouseDown={handleMouseDown}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            handleFocus();
          }
        }}
      >
        <Svg type="ChevronDown" color="#fff" width={24} height={24} />
      </div>
    </div>
  );
}

Select.propTypes = {
  children: PropTypes.node.isRequired,
};
