import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import { Waypoint } from 'react-waypoint';
import { useState } from 'react';

/**
 * Renders a number with an animation, when the component is visible.
 *
 * @param {{ number: number, img: string, complement: string, text: string }} props
 * @returns {JSX.Element}
 */
export function BigNumber({ number, img, complement, text }) {
  const [animate, setAnimate] = useState(false);

  return (
    <div className="flex flex-col items-center md:flex-row justify-center md:gap-4">
      <figure className="h-[75px] ">
        <img src={img} alt="Logo" className="h-full object-contain" />
      </figure>

      <div className="flex flex-col md:items-start items-center justify-center pt-2">
        <Waypoint onEnter={() => setAnimate(true)}>
          <div className="text-5xl leading-none p-0 font-serif font-extrabold text-blue-dark">
            {animate ? (
              <CountUp start={0} end={number} duration={4} />
            ) : (
              <span>0</span>
            )}
            <span className="text-2xl font-normal">{complement}</span>
          </div>
        </Waypoint>
        <div className="text-green -translate-y-2">{text}</div>
      </div>
    </div>
  );
}

BigNumber.propTypes = {
  number: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  complement: PropTypes.string,
  text: PropTypes.string.isRequired,
};
