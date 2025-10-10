import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";

// 主应用组件
function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-background">
        {/* 路由出口 */}
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

export default App;
