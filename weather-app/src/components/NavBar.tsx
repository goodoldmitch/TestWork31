'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '@/styles/components/NavBar.module.scss';

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={pathname === '/' ? styles.active : ''}>
          <Link href="/">Главная</Link>
        </li>
        <li className={pathname === '/favorites' ? styles.active : ''}>
          <Link href="/favorites">Избранное</Link>
        </li>
      </ul>
    </nav>
  );
};
