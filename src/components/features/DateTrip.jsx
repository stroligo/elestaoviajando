import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

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

  return <div>{dataFormatada}</div>;
}

DateTrip.propTypes = {
  date: PropTypes.string.isRequired,
};
