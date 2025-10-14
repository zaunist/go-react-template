import { Outlet } from "react-router-dom";

// 主应用组件
function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* 路由出口 */}
      <Outlet />
    </div>
  );
}

export default App;
