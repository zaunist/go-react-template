import React, { useRef, useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  ZoomIn,
  ZoomOut,
  Paintbrush,
  Lasso,
  Eraser,
  Hand,
  Download,
  RotateCcw,
  ImagePlus,
  GripVertical,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";

// 工具类型
type ToolType = "brush" | "lasso" | "eraser" | "hand";

// WatermarkEditorPage：专业水印去除编辑器
// - 上传图片后显示画布，底部浮动工具栏
// - 支持画笔、套索、橡皮擦工具
// - 支持缩放和平移
// - 右下角下载按钮

export const WatermarkEditorPage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const maskRef = useRef<HTMLCanvasElement | null>(null);
  const previewRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [tool, setTool] = useState<ToolType>("brush");
  const [brushSize, setBrushSize] = useState(16);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawPath, setDrawPath] = useState<Array<{ x: number; y: number }>>([]);
  const [processing, setProcessing] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });
  const [showBrushPanel, setShowBrushPanel] = useState(false);

  // 工具栏拖拽相关状态
  const toolbarRef = useRef<HTMLDivElement | null>(null);
  const [toolbarPosition, setToolbarPosition] = useState({ x: 0, y: 0 });
  const [isToolbarDragging, setIsToolbarDragging] = useState(false);
  const [toolbarDragStart, setToolbarDragStart] = useState({ x: 0, y: 0 });
  const [toolbarInitialized, setToolbarInitialized] = useState(false);

  // 初始化工具栏位置（居中底部）
  useEffect(() => {
    if (img && !toolbarInitialized && toolbarRef.current) {
      const toolbarWidth = toolbarRef.current.offsetWidth;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      setToolbarPosition({
        x: (windowWidth - toolbarWidth) / 2,
        y: windowHeight - 100,
      });
      setToolbarInitialized(true);
    }
  }, [img, toolbarInitialized]);

  // 重置工具栏初始化状态
  useEffect(() => {
    if (!img) {
      setToolbarInitialized(false);
    }
  }, [img]);

  // 工具栏拖拽处理
  const handleToolbarDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsToolbarDragging(true);
    setToolbarDragStart({
      x: e.clientX - toolbarPosition.x,
      y: e.clientY - toolbarPosition.y,
    });
  };

  useEffect(() => {
    const handleToolbarDragMove = (e: MouseEvent) => {
      if (!isToolbarDragging) return;
      const newX = e.clientX - toolbarDragStart.x;
      const newY = e.clientY - toolbarDragStart.y;

      // 限制在窗口范围内
      const toolbarWidth = toolbarRef.current?.offsetWidth || 0;
      const toolbarHeight = toolbarRef.current?.offsetHeight || 0;
      const maxX = window.innerWidth - toolbarWidth;
      const maxY = window.innerHeight - toolbarHeight;

      setToolbarPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(66, Math.min(newY, maxY)), // 66px 是 header 高度
      });
    };

    const handleToolbarDragEnd = () => {
      setIsToolbarDragging(false);
    };

    if (isToolbarDragging) {
      window.addEventListener("mousemove", handleToolbarDragMove);
      window.addEventListener("mouseup", handleToolbarDragEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleToolbarDragMove);
      window.removeEventListener("mouseup", handleToolbarDragEnd);
    };
  }, [isToolbarDragging, toolbarDragStart]);

  // 缩放控制
  const zoomIn = () => setScale((s) => Math.min(s + 0.1, 3));
  const zoomOut = () => setScale((s) => Math.max(s - 0.1, 0.1));
  const resetZoom = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (!img) return;
    const canvas = canvasRef.current!;
    const mask = maskRef.current!;
    const preview = previewRef.current!;
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    canvas.width = w;
    canvas.height = h;
    mask.width = w;
    mask.height = h;
    preview.width = w;
    preview.height = h;
    canvas.getContext("2d")!.drawImage(img, 0, 0);
    mask.getContext("2d")!.clearRect(0, 0, w, h);
    preview.getContext("2d")!.clearRect(0, 0, w, h);

    // 自动计算初始缩放
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth - 100;
      const containerHeight = containerRef.current.clientHeight - 100;
      const scaleX = containerWidth / w;
      const scaleY = containerHeight / h;
      const initialScale = Math.min(scaleX, scaleY, 1);
      setScale(initialScale);
    }
  }, [img]);

  const handleFile = (file?: File) => {
    const f = file || fileInputRef.current?.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      setImg(image);
      setOffset({ x: 0, y: 0 });
    };
    image.src = url;
  };

  const toCanvasCoords = useCallback((e: React.MouseEvent) => {
    const rect = previewRef.current!.getBoundingClientRect();
    const x =
      ((e.clientX - rect.left) / rect.width) * previewRef.current!.width;
    const y =
      ((e.clientY - rect.top) / rect.height) * previewRef.current!.height;
    return { x, y };
  }, []);

  // 开始绘制/平移
  const handleMouseDown = (e: React.MouseEvent) => {
    if (tool === "hand") {
      setIsPanning(true);
      setLastPanPoint({ x: e.clientX, y: e.clientY });
      return;
    }

    if (tool === "eraser") {
      setIsDrawing(true);
      const p = toCanvasCoords(e);
      eraseAt(p.x, p.y);
      return;
    }

    setIsDrawing(true);
    const p = toCanvasCoords(e);
    setDrawPath([p]);
  };

  // 绘制过程
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning && tool === "hand") {
      const dx = e.clientX - lastPanPoint.x;
      const dy = e.clientY - lastPanPoint.y;
      setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      setLastPanPoint({ x: e.clientX, y: e.clientY });
      return;
    }

    if (!isDrawing) return;

    if (tool === "eraser") {
      const p = toCanvasCoords(e);
      eraseAt(p.x, p.y);
      return;
    }

    const p = toCanvasCoords(e);
    setDrawPath((prev) => {
      const next = [...prev, p];
      drawPreview(next);
      return next;
    });
  };

  // 结束绘制
  const handleMouseUp = () => {
    if (isPanning) {
      setIsPanning(false);
      return;
    }

    if (!isDrawing) return;
    setIsDrawing(false);

    if (tool === "eraser") return;

    const points = drawPath;
    if (points.length >= 3) {
      const mctx = maskRef.current!.getContext("2d")!;
      mctx.save();
      mctx.fillStyle = "rgba(123, 74, 255, 0.4)";
      mctx.beginPath();
      mctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++)
        mctx.lineTo(points[i].x, points[i].y);
      mctx.closePath();
      mctx.fill();
      mctx.restore();
    }

    previewRef.current
      ?.getContext("2d")!
      .clearRect(0, 0, previewRef.current!.width, previewRef.current!.height);
    setDrawPath([]);
  };

  // 橡皮擦
  const eraseAt = (x: number, y: number) => {
    const mctx = maskRef.current?.getContext("2d");
    if (!mctx) return;
    mctx.save();
    mctx.globalCompositeOperation = "destination-out";
    mctx.beginPath();
    mctx.arc(x, y, brushSize * 2, 0, Math.PI * 2);
    mctx.fill();
    mctx.restore();
  };

  // 绘制预览线条
  const drawPreview = (points: Array<{ x: number; y: number }>) => {
    const ctx = previewRef.current?.getContext("2d");
    if (!ctx || points.length < 2) return;
    ctx.clearRect(0, 0, previewRef.current!.width, previewRef.current!.height);
    ctx.save();
    ctx.strokeStyle = "rgba(123, 74, 255, 0.9)";
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++)
      ctx.lineTo(points[i].x, points[i].y);
    ctx.stroke();
    ctx.restore();
  };

  const clearMask = () => {
    maskRef.current
      ?.getContext("2d")!
      .clearRect(0, 0, maskRef.current!.width, maskRef.current!.height);
    previewRef.current
      ?.getContext("2d")!
      .clearRect(0, 0, previewRef.current!.width, previewRef.current!.height);
  };

  const canvasToRGBA = (c: HTMLCanvasElement) => {
    const ctx = c.getContext("2d")!;
    const imgd = ctx.getImageData(0, 0, c.width, c.height);
    return new Uint8Array(imgd.data.buffer);
  };

  const applyInpaint = async () => {
    if (!canvasRef.current || !maskRef.current) return;
    setProcessing(true);
    setShowOverlay(true);
    await new Promise((r) => setTimeout(r, 50));

    const canvas = canvasRef.current;
    const mask = maskRef.current;
    const w = canvas.width;
    const h = canvas.height;
    const imgBytes = canvasToRGBA(canvas);

    const mctx = mask.getContext("2d")!;
    const mdata = mctx.getImageData(0, 0, w, h).data;
    const maskArr = new Uint8Array(w * h);
    for (let i = 0; i < w * h; i++) {
      maskArr[i] = mdata[i * 4 + 3] > 10 ? 1 : 0;
    }

    const out = advancedInpaint(imgBytes, maskArr, w, h);

    const ctx = canvas.getContext("2d")!;
    const outData = new Uint8ClampedArray(out.length);
    outData.set(out);
    ctx.putImageData(new ImageData(outData, w, h), 0, 0);

    mctx.clearRect(0, 0, w, h);
    setProcessing(false);

    setTimeout(() => {
      setShowOverlay(false);
    }, 800);
  };

  // 改进的 inpaint 算法
  const advancedInpaint = (
    imgBytes: Uint8Array,
    mask: Uint8Array,
    w: number,
    h: number
  ): Uint8Array => {
    const out = new Uint8Array(imgBytes);
    const filled = new Uint8Array(mask);
    const getIdx = (x: number, y: number) => (y * w + x) * 4;
    const pIdx = (x: number, y: number) => y * w + x;
    const inB = (x: number, y: number) => x >= 0 && x < w && y >= 0 && y < h;

    let minX = w,
      maxX = 0,
      minY = h,
      maxY = 0;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (mask[pIdx(x, y)] === 1) {
          minX = Math.min(minX, x);
          maxX = Math.max(maxX, x);
          minY = Math.min(minY, y);
          maxY = Math.max(maxY, y);
        }
      }
    }
    const maskSize = Math.max(maxX - minX, maxY - minY);
    const maxRadius = Math.max(10, Math.ceil(maskSize / 2) + 10);

    let radius = 4;
    const maxIter = maskSize * 3;
    for (let iter = 0; iter < maxIter; iter++) {
      let changed = false;
      if (iter > 0 && iter % 5 === 0 && radius < maxRadius) {
        radius = Math.min(radius + 3, maxRadius);
      }

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          if (filled[pIdx(x, y)] !== 1) continue;
          let rS = 0,
            gS = 0,
            bS = 0,
            wS = 0;

          for (let dy = -radius; dy <= radius; dy++) {
            for (let dx = -radius; dx <= radius; dx++) {
              if (dx === 0 && dy === 0) continue;
              if (!inB(x + dx, y + dy)) continue;
              if (filled[pIdx(x + dx, y + dy)] === 1) continue;
              const d = Math.sqrt(dx * dx + dy * dy);
              if (d > radius) continue;
              const wt = 1 / (1 + d);
              const i = getIdx(x + dx, y + dy);
              rS += out[i] * wt;
              gS += out[i + 1] * wt;
              bS += out[i + 2] * wt;
              wS += wt;
            }
          }
          if (wS > 0) {
            const i = getIdx(x, y);
            out[i] = Math.round(rS / wS);
            out[i + 1] = Math.round(gS / wS);
            out[i + 2] = Math.round(bS / wS);
            out[i + 3] = 255;
            filled[pIdx(x, y)] = 0;
            changed = true;
          }
        }
      }
      if (!changed) break;
    }

    let remaining = 0;
    for (let i = 0; i < w * h; i++) if (filled[i] === 1) remaining++;
    if (remaining > 0) {
      let rS = 0,
        gS = 0,
        bS = 0,
        cnt = 0;
      const pad = Math.ceil(maskSize / 4);
      for (
        let y = Math.max(0, minY - pad);
        y <= Math.min(h - 1, maxY + pad);
        y++
      ) {
        for (
          let x = Math.max(0, minX - pad);
          x <= Math.min(w - 1, maxX + pad);
          x++
        ) {
          if (filled[pIdx(x, y)] === 0) {
            const i = getIdx(x, y);
            rS += out[i];
            gS += out[i + 1];
            bS += out[i + 2];
            cnt++;
          }
        }
      }
      if (cnt > 0) {
        const avgR = Math.round(rS / cnt);
        const avgG = Math.round(gS / cnt);
        const avgB = Math.round(bS / cnt);
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            if (filled[pIdx(x, y)] === 1) {
              const i = getIdx(x, y);
              out[i] = avgR;
              out[i + 1] = avgG;
              out[i + 2] = avgB;
              out[i + 3] = 255;
              filled[pIdx(x, y)] = 0;
            }
          }
        }
      }
    }

    for (let p = 0; p < 50; p++) {
      const tmp = new Uint8Array(out);
      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          if (mask[pIdx(x, y)] !== 1) continue;
          let r = 0,
            g = 0,
            b = 0;
          const k = [
            [1, 2, 1],
            [2, 4, 2],
            [1, 2, 1],
          ];
          for (let ky = 0; ky < 3; ky++) {
            for (let kx = 0; kx < 3; kx++) {
              const i = getIdx(x + kx - 1, y + ky - 1);
              r += tmp[i] * k[ky][kx];
              g += tmp[i + 1] * k[ky][kx];
              b += tmp[i + 2] * k[ky][kx];
            }
          }
          const i = getIdx(x, y);
          out[i] = Math.round(r / 16);
          out[i + 1] = Math.round(g / 16);
          out[i + 2] = Math.round(b / 16);
        }
      }
    }
    return out;
  };

  const downloadResult = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "watermark-removed.png";
    a.click();
  };

  const getCursor = () => {
    if (tool === "hand") return isPanning ? "grabbing" : "grab";
    if (tool === "eraser") return "crosshair";
    return "crosshair";
  };

  // 工具配置
  const tools = [
    { id: "brush" as ToolType, icon: Paintbrush, label: "Brush" },
    { id: "lasso" as ToolType, icon: Lasso, label: "Lasso" },
    { id: "eraser" as ToolType, icon: Eraser, label: "Eraser" },
  ];

  // 添加未使用的变量占位
  void resetZoom;

  return (
    <div className="relative w-full h-full bg-gray-100 dark:bg-slate-900 overflow-hidden">
      {/* 隐藏的文件输入 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] ?? undefined)}
      />

      {/* 未上传图片时显示上传区域 */}
      {!img && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center w-96 h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-slate-800 cursor-pointer hover:border-[#7b4aff] hover:bg-gray-50 dark:hover:bg-slate-700 transition-all group"
          >
            <div className="w-20 h-20 mb-4 rounded-full bg-[#7b4aff]/10 flex items-center justify-center group-hover:bg-[#7b4aff]/20 transition-colors">
              <ImagePlus className="w-10 h-10 text-[#7b4aff]" />
            </div>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Click to Upload Image
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Support JPG, PNG, WebP formats
            </p>
          </div>
        </div>
      )}

      {/* 画布区域 */}
      {img && (
        <div
          ref={containerRef}
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
          style={{ cursor: getCursor() }}
        >
          <div
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
              transformOrigin: "center center",
              transition: isPanning ? "none" : "transform 0.1s ease-out",
            }}
          >
            <div className="relative shadow-2xl rounded-lg overflow-hidden">
              <canvas
                ref={canvasRef}
                style={{
                  display: "block",
                  maxWidth: "none",
                }}
              />
              {/* Mask canvas */}
              <canvas
                ref={maskRef}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  pointerEvents: "none",
                  width: "100%",
                  height: "100%",
                }}
              />
              {/* Preview canvas */}
              <canvas
                ref={previewRef}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  pointerEvents: "auto",
                  width: "100%",
                  height: "100%",
                }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onMouseMove={handleMouseMove}
              />
            </div>
          </div>
        </div>
      )}

      {/* 顶部工具栏 - New Photo 按钮 */}
      {img && (
        <div className="absolute top-4 left-4 z-10">
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="bg-[#7b4aff] hover:bg-[#6b3ae6] text-white shadow-lg"
          >
            <ImagePlus className="w-4 h-4 mr-2" />
            New Photo
          </Button>
        </div>
      )}

      {/* 底部浮动工具栏 */}
      {img && (
        <div
          ref={toolbarRef}
          className="fixed z-10"
          style={{
            left: toolbarInitialized ? toolbarPosition.x : "50%",
            top: toolbarInitialized ? toolbarPosition.y : "auto",
            bottom: toolbarInitialized ? "auto" : 24,
            transform: toolbarInitialized ? "none" : "translateX(-50%)",
          }}
        >
          <div className="flex items-center gap-1 px-2 py-2 bg-white dark:bg-slate-800 rounded-full shadow-xl border border-gray-200 dark:border-slate-700">
            {/* 拖拽手柄 */}
            <div
              onMouseDown={handleToolbarDragStart}
              className="flex items-center justify-center px-1 py-2 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
              title="Drag to move toolbar"
            >
              <GripVertical className="w-4 h-4" />
            </div>

            {/* 分隔线 */}
            <div className="w-px h-8 bg-gray-200 dark:bg-slate-600" />

            {/* 工具选择 */}
            <div className="flex items-center gap-1 px-2">
              {tools.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTool(t.id);
                    if (t.id === "brush") setShowBrushPanel(!showBrushPanel);
                    else setShowBrushPanel(false);
                  }}
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-full transition-all ${
                    tool === t.id
                      ? "bg-[#7b4aff]/10 text-[#7b4aff] border border-[#7b4aff]"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                  }`}
                  title={t.label}
                >
                  <t.icon className="w-5 h-5" />
                  {tool === t.id && t.id === "brush" && (
                    <span className="text-sm font-medium">{t.label}</span>
                  )}
                </button>
              ))}
            </div>

            {/* 分隔线 */}
            <div className="w-px h-8 bg-gray-200 dark:bg-slate-600 mx-2" />

            {/* 清除选区 */}
            <button
              onClick={clearMask}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors"
              title="Clear Selection"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            {/* 分隔线 */}
            <div className="w-px h-8 bg-gray-200 dark:bg-slate-600 mx-2" />

            {/* 缩放控制 */}
            <button
              onClick={zoomIn}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300 min-w-[50px] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={zoomOut}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>

            {/* 移动工具 */}
            <button
              onClick={() => setTool("hand")}
              className={`p-2 rounded-full transition-colors ${
                tool === "hand"
                  ? "bg-[#7b4aff]/10 text-[#7b4aff]"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
              }`}
              title="Pan"
            >
              <Hand className="w-5 h-5" />
            </button>

            {/* 分隔线 */}
            <div className="w-px h-8 bg-gray-200 dark:bg-slate-600 mx-2" />

            {/* Remove 按钮 */}
            <Button
              onClick={applyInpaint}
              disabled={processing}
              className="bg-[#7b4aff] hover:bg-[#6b3ae6] text-white px-6 rounded-full"
            >
              {processing ? "Processing..." : "Remove"}
            </Button>
          </div>

          {/* 画笔大小面板 */}
          {showBrushPanel && tool === "brush" && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-3 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-200 dark:border-slate-700">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                  Brush Size:
                </span>
                <Slider
                  value={[brushSize]}
                  onValueChange={(v) => setBrushSize(v[0])}
                  min={2}
                  max={50}
                  step={1}
                  className="w-40"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200 min-w-[32px] text-right">
                  {brushSize}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 右下角下载按钮 */}
      {img && (
        <div className="absolute bottom-6 right-6 z-10">
          <Button
            onClick={downloadResult}
            className="bg-[#7b4aff] hover:bg-[#6b3ae6] text-white px-8 py-3 rounded-full shadow-xl text-base font-medium"
          >
            <Download className="w-5 h-5 mr-2" />
            Download
          </Button>
        </div>
      )}

      {/* Processing overlay */}
      {showOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-[#7b4aff]/20 border-t-[#7b4aff] rounded-full animate-spin" />
            <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
              Removing watermark...
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Please wait a moment
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatermarkEditorPage;
