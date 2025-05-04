import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componente globale
import Header from './components/Header';
import Footer from './components/Footer';
import Layout from './components/Layout';

// Pagini principale
import WelcomePage from './pages/WelcomePage';
import Login from './pages/Login';
import Inregistrare from './pages/Inregistrare';
import ResetPassword from './pages/ResetPassword';

// Pagini aplicație
import Home from './pages/Home';
import Trenuri from './pages/Trenuri';
import Vagoane from './pages/Vagoane';
import Rapoarte from './pages/Rapoarte';
import RaportNou from './pages/RaportNou';
import Utilizatori from './pages/Utilizatori';
import Profil from './pages/Profil';
import Harta from './pages/Harta';
import DetaliiVagon from './pages/DetaliiVagon';

// Pagini alertare
import Alerte from './pages/Alerte';
import AdaugaAlerta from './pages/AdaugaAlerta';

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        {/* Pagini fără Layout */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/autentificare" element={<Login />} />
        <Route path="/inregistrare" element={<Inregistrare />} />
        <Route path="/resetare-parola" element={<ResetPassword />} />
        <Route path="/profil" element={<Profil />} />

        {/* Pagini cu Layout */}
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/trenuri" element={<Layout><Trenuri /></Layout>} />
        <Route path="/vagoane" element={<Layout><Vagoane /></Layout>} />
        <Route path="/rapoarte" element={<Layout><Rapoarte /></Layout>} />
        <Route path="/raportnou" element={<Layout><RaportNou /></Layout>} />
        <Route path="/utilizatori" element={<Layout><Utilizatori /></Layout>} />
        <Route path="/alerte" element={<Layout><Alerte /></Layout>} />
        <Route path="/adauga-alerta" element={<Layout><AdaugaAlerta /></Layout>} />
        <Route path="/harta" element={<Layout><Harta /></Layout>} />
        <Route path="/harta/:id" element={<Layout><Harta /></Layout>} />
        <Route path="/vagon/:id" element={<Layout><DetaliiVagon /></Layout>} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
