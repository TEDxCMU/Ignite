import Link  from 'next/link';

function Countdown() {
  return (
    <div>
      <Link href="/countdown/game1">game1</Link>
      <Link href="/countdown/game2">game2</Link>
      <Link href="/countdown/game3">game3</Link>
    </div>
  );
}

export default Countdown;