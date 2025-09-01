import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Membership from './pages/Membership';
import Contact from './pages/Contact';
import Conferences from './pages/resources/Conferences';
import Workshops from './pages/resources/Workshops';
import ResearchPapers from './pages/resources/ResearchPapers';
import CommunityForum from './pages/resources/CommunityForum';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="membership" element={<Membership />} />
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