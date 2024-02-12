import { useGameHistory } from '@/hooks/use-game-history';

export default function GameHistory() {
  const { gameHistory } = useGameHistory();

  console.log(gameHistory);

  return <div>History</div>;
}
