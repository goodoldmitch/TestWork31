'use client';
import { FavoriteList } from '@/components/FavoriteList';

export default function FavoritesPage() {
  return (
    <main className="container py-4">
      <h1 className="mb-4">Избранные города</h1>
      <FavoriteList />
    </main>
  );
}