import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header.component';
import Footer from './components/footer.component';
import HomePage from './pages/home.page';
import StatsPage from './pages/stats.page';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen h-screen">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/stats" element={<StatsPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
