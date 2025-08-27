import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Experiences from "./pages/Experiences"; // ✅ استيراد الصفحة الجديدة
import "./App.css";

function App() {
  return (
    <Layout>
      <div className="scroll-container">
        <section className="section">
          <Home />
        </section>
        <section className="section">
          <Skills />
        </section>
        <section className="section">
          <Experiences /> {/* ✅ صفحة خبراتي */}
        </section>
        <section className="section">
          <Projects />
        </section>
        <section className="section">
          <Contact />
        </section>
      </div>
    </Layout>
  );
}

export default App;
