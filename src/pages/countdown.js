import Leaderboard from 'components/leaderboard';
import Link  from 'next/link';

function Countdown() {
  return (
    <div>
      <Link href="/countdown/p5GameDemo">p5.js Demo</Link>
      <Link href="/countdown/3DPhysicsDemo">3D Physics Demo</Link>
      <Link href="/countdown/3DAnimationDemo">3D Animation Demo</Link>
      <Link href="/countdown/2DDemo">2D Demo with Physics</Link>
      <Leaderboard />
    </div>
  );
}

export default Countdown;