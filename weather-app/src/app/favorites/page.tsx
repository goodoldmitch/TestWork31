'use client';
import { FavoriteList } from '@/components/FavoriteList';
import { Navbar } from '@/components/NavBar';

export default function FavoritesPage() {
  return (
    <main className="container py-4">
      <Navbar />
      <h1 className="mb-4">Избранные города</h1>
      <FavoriteList />
    </main>
  );
}