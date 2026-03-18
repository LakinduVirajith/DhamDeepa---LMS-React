import { Outlet } from 'react-router';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function Layout() {
  return (
    <section className="min-h-screen flex flex-col">
      <header>
        <NavBar />
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </section>
  );
}
