import React, { FC } from 'react';

import { useTheme } from '@mui/material';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartEvent,
  ActiveElement,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { EMPTY_STRING_FN, NOOP } from '@/feature/constants';

import { IProductGroup } from './types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface IPortfolioCompositionChart {
  productGroups: IProductGroup[];
}

const PortfolioCompositionChart: FC<IPortfolioCompositionChart> = ({
  productGroups,
}) => {
  const theme = useTheme();
  const labels = productGroups.map((group) => group.productGroupLabel);
  // сейчас в моковых данных вес группы хранится долей ("0,4") от портфеля, а в описании графика мы выводим процент от портфеля (умножаем долю на 100)
  const values = productGroups.map((group) => group.weight * 100);

  const handleLabelClick = () => {
    const url = 'https://ru.wikipedia.org/wiki/URL';
    window.open(url, '_blank');
  };

  const handleChartClick = (event: ChartEvent, elements: ActiveElement[]) => {
    if (elements.length > 0) {
      handleLabelClick();
    }
  };

  return (
    <Doughnut
      data={{
        labels: labels.map((label, i) => `${values[i]}% ${label}`),
        datasets: [
          {
            label: '% of portfolio',
            data: values,
            backgroundColor: Object.values(theme.palette.colorsForDonutChart),
          },
        ],
      }}
      options={{
        cutout: '20%',
        plugins: {
          legend: {
            position: 'bottom',
            // колбэк ниже отменяет дефолтное поведение по нажатию (исключение секоров из графика)
            onClick: NOOP,
          },
          tooltip: {
            displayColors: false,
            // колбэк ниже удаляет вторую строку из тултипа (подсказки, отображаемой при наведении на сектор)
            callbacks: {
              label: EMPTY_STRING_FN,
            },
          },
        },
        onClick: handleChartClick,
      }}
    />
  );
};

export default PortfolioCompositionChart;
