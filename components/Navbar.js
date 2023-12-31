import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
      <h3>My Recipes</h3>
      <Link href="/">Recipe Dashboard</Link>
    </nav>
  );
}
