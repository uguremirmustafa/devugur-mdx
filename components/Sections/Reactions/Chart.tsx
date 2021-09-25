import useGetAllReactions from 'hooks/useGetAllReactions';
import { ChartData } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

interface Props {}

const Chart = (props: Props) => {
  const { data: allReactions, isLoading, error } = useGetAllReactions();

  if (error) return <div>{error}</div>;
  if (isLoading) return <div>loading...</div>;

  let thumbsupNumber = allReactions
    .map((reaction) => reaction.thumbsup)
    .reduce((sum, cur) => sum + cur);
  let rockyouNumber = allReactions
    .map((reaction) => reaction.rockyou)
    .reduce((sum, cur) => sum + cur);
  let heartNumber = allReactions.map((reaction) => reaction.heart).reduce((sum, cur) => sum + cur);
  let rocketNumber = allReactions
    .map((reaction) => reaction.rocket)
    .reduce((sum, cur) => sum + cur);
  let partyNumber = allReactions.map((reaction) => reaction.party).reduce((sum, cur) => sum + cur);

  const chartData: ChartData = {
    labels: ['👍', '🤘', '💖', '🚀', '🎉'],
    datasets: [
      {
        label: '# of reactions',
        data: [thumbsupNumber, rockyouNumber, heartNumber, rocketNumber, partyNumber],
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        animation: {
          easing: 'easeInSine',
        },
      },
    ],
  };
  return (
    <div className="w-full max-w-sm mx-auto">
      <h3 className="text-center">Total reactions to the posts</h3>
      <Doughnut data={chartData} className="text-3xl" />
    </div>
  );
};

export default Chart;
