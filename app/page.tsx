import styles from '@css/page.module.css';
import Home from '$Home';

export default function Index({ searchParams }: { searchParams: Record<string, string | string[]> }) {
  return (
    <main className={styles.main}>
      <Home searchParams={searchParams} />
    </main>
  );
}
