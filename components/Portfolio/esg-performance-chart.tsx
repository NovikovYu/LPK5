import React, { FC } from 'react';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { EMPTY_STRING_FN, NOOP } from '@/feature/constants';

import { IDataSet } from './types';

ChartJS.register(ArcElement, Tooltip, Legend);

const ESGPerformanceChart: FC<IDataSet> = ({ labels, values }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('xs'));
  const chartWidth = isDesktop ? 400 : 300;
  const chartHeight = isDesktop ? 300 : 200;

  return (
    <Doughnut
      options={{
        plugins: {
          legend: {
            position: isDesktop ? ('right' as const) : ('bottom' as const),
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
        cutout: '80%',
        responsive: true,
        maintainAspectRatio: false,
      }}
      width={chartWidth}
      height={chartHeight}
      data={{
        labels: labels,
        datasets: [
          {
            label: '# of Votes',
            data: values,
            backgroundColor: Object.values(theme.palette.colorsForDonutChart),
          },
        ],
      }}
    />
  );
};

export default ESGPerformanceChart;
