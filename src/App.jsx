import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

import { PreloadProvider } from './PreloadContext';
import Preloader from './sections/Preloader';
import Hero from './sections/Hero';
import FirstVideo from './sections/FirstVideo';
import Jason from './sections/Jason';
import SecondVideo from './sections/SecondVideo';
import Lucia from './sections/Lucia';
import PostCard from './sections/PostCard';
import Final from './sections/Final';
import Outro from './sections/Outro';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  return (
    <PreloadProvider>
      <Preloader />
      <main>
        <Hero />

        <FirstVideo />
        <Jason />

        <SecondVideo />
        <Lucia />

        <PostCard />
        <Final />
        <Outro />
      </main>
    </PreloadProvider>
  )
}

export default App
