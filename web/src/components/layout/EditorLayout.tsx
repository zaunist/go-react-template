import { Outlet } from "react-router-dom";
import { Header } from "./Header";

// EditorLayout: 专门用于编辑器页面的布局
// - 只保留顶部 Header 导航栏
// - 没有 Footer，编辑器可以占满剩余空间
// - 适用于需要全屏操作的工具页面

export const EditorLayout: React.FC = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      {/* 主内容区域，占据除 header 外的所有空间 */}
      <main className="flex-1 overflow-hidden" style={{ marginTop: "66px" }}>
        <Outlet />
      </main>
    </div>
  );
};
