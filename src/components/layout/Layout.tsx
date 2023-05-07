import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import QuizePage from '../../pages/QuizePage';
import HomePage from '../../pages/HomePage';
import ErrorPage from '../../pages/ErrorPage';
import ResultPage from '../../pages/ResultPage';

const Layout = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/quize/:index' element={<QuizePage />} />
        <Route path='/result' element={<ResultPage />} />
        <Route path='*' element={<ErrorPage />} />        
      </Routes>
    </Router>
  );
};

export default Layout;
