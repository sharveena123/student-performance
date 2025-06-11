import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ModelPage from './pages/ModelViewer';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ModelPage />} />
        <Route path="/model" element={<ModelPage />} />
      </Routes>
    </Router>
  );
}

export default App;
