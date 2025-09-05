import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/layout/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Membership from './pages/Membership';
import Contact from './pages/Contact';
import Conferences from './pages/resources/Conferences';
import Workshops from './pages/resources/Workshops';
import ResearchPapers from './pages/resources/ResearchPapers';
import CommunityForum from './pages/resources/CommunityForum';
import TeamSection from './pages/teams/TeamSection';
import MembershipCheckout from './pages/MembershipCheckout';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="about/teams/:sectionId" element={<TeamSection />} />
          <Route path="membership" element={<Membership />} />
          <Route path="membership/checkout" element={<MembershipCheckout />} />
          <Route path="contact" element={<Contact />} />
          <Route path="resources/conferences" element={<Conferences />} />
          <Route path="resources/workshops" element={<Workshops />} />
          <Route path="resources/research-papers" element={<ResearchPapers />} />
          <Route path="resources/community-forum" element={<CommunityForum />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;