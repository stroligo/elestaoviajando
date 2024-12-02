import PropTypes from 'prop-types';
import { useCallback } from 'react';
import style from './style.module.css';
import { Svg } from '../Icons';

export function Select(props) {
  const { onChange } = props;

  const handleClearSelection = useCallback(
    (event) => {
      event.stopPropagation();
      onChange('');
    },
    [onChange],
  );

  return (
    <div className={`${style.selectContainer} relative`}>
      <select {...props} className={style.select}>
        {props.children}
      </select>
      <div className={style.selectIcon}>
        <Svg
          type="Filter"
          color="#fff"
          width={14}
          height={14}
          onClick={handleClearSelection}
        />
      </div>
    </div>
  );
}

Select.propTypes = {
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
};
