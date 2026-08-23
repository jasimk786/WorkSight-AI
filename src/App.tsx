import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CaptureProvider } from "./state/CaptureContext";
import { AppBottomNavigation } from "./components/AppBottomNavigation";
import { SplashScreen } from "./screens/SplashScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { NewCaptureScreen } from "./screens/NewCaptureScreen";
import { CameraScreen } from "./screens/CameraScreen";
import { ReviewScreen } from "./screens/ReviewScreen";
import { ProblemDetailsScreen } from "./screens/ProblemDetailsScreen";
import { ProcessingScreen } from "./screens/ProcessingScreen";
import { KnowledgeResultScreen } from "./screens/KnowledgeResultScreen";
import { LibraryScreen } from "./screens/LibraryScreen";
import { KnowledgeDetailScreen } from "./screens/KnowledgeDetailScreen";
import { ProfileScreen } from "./screens/ProfileScreen";

function Layout() {
  const location = useLocation();
  const hideNav = ["/", "/splash"].includes(location.pathname) || location.pathname.startsWith("/camera") || location.pathname.startsWith("/processing");

  return (
    <div className="app-shell">
      <div className="screen" style={hideNav ? { paddingBottom: 0 } : undefined}>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/capture" element={<NewCaptureScreen />} />
          <Route path="/camera" element={<CameraScreen />} />
          <Route path="/review" element={<ReviewScreen />} />
          <Route path="/details" element={<ProblemDetailsScreen />} />
          <Route path="/processing" element={<ProcessingScreen />} />
          <Route path="/result" element={<KnowledgeResultScreen />} />
          <Route path="/library" element={<LibraryScreen />} />
          <Route path="/knowledge/:id" element={<KnowledgeDetailScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
        </Routes>
      </div>
      {!hideNav && <AppBottomNavigation />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CaptureProvider>
        <Layout />
      </CaptureProvider>
    </BrowserRouter>
  );
}
