import { SceneManager } from './components/SceneManager';
import { AudioVisualizerProvider } from './context/AudioVisualizerContext';

function App() {
  const baseUrl = import.meta.env.BASE_URL || './';
  return (
    <AudioVisualizerProvider
      primarySrc={`${baseUrl}audio/tung-ngay-yeu-em.mp3`}
      fallbackSrc={`${baseUrl}audio/Từng Ngày Yêu Em.mp3`}
      title="Từng Ngày Yêu Em — Bùi Trường Linh"
    >
      <main className="w-full h-full relative overflow-hidden bg-[#120B1E]">
        <SceneManager />
      </main>
    </AudioVisualizerProvider>
  );
}

export default App;
