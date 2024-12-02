import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../Icons';

const meses = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
];

/**
 * Formats a given date string into a human-readable format in Portuguese.
 * The format is "day de month de year". If the date is invalid, it displays "Data inválida".
 *
 * @param {Object} props - The component props.
 * @param {string} props.date - The date string to be formatted.
 * @returns {JSX.Element} A div containing the formatted date.
 */
export function DateTrip({ date }) {
  const [dataFormatada, setDataFormatada] = useState('');

  useEffect(() => {
    const data = new Date(date);
    if (!isNaN(data.getTime())) {
      const dia = data.getDate();
      const mes = meses[data.getMonth()];
      const ano = data.getFullYear();

      setDataFormatada(`${dia} de ${mes} de ${ano}`);
    } else {
      setDataFormatada('Data inválida');
    }
  }, [date]);

  return (
    <div className="text-sm  text-orange items-center flex gap-2 select-none w-fit">
      <Svg type="Calendar" color="#ebb858" width={16} height={16} />
      <span className="translate-y-[1px]">{dataFormatada}</span>
    </div>
  );
}

DateTrip.propTypes = {
  date: PropTypes.string.isRequired,
};
