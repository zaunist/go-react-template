import React, { useRef, useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";

// WatermarkEditor：
// - 上传图片后，用鼠标画一个闭合圈圈住要去除的区域
// - 松开鼠标后自动闭合选区
// - 点击 Remove 使用迭代填充+多次模糊算法去除选区内容

export const WatermarkEditor: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const maskRef = useRef<HTMLCanvasElement | null>(null);
  const previewRef = useRef<HTMLCanvasElement | null>(null);

  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [lineWidth, setLineWidth] = useState(3);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawPath, setDrawPath] = useState<Array<{ x: number; y: number }>>([]);
  const [processing, setProcessing] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

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
  }, [img]);

  const handleFile = (file?: File) => {
    const f = file || fileInputRef.current?.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => setImg(image);
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

  // 开始画圈
  const startDraw = (e: React.MouseEvent) => {
    setIsDrawing(true);
    const p = toCanvasCoords(e);
    setDrawPath([p]);
  };

  // 画圈过程中
  const onDraw = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const p = toCanvasCoords(e);
    setDrawPath((prev) => {
      const next = [...prev, p];
      drawPreview(next);
      return next;
    });
  };

  // 结束画圈 - 自动闭合并填充
  const endDraw = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const points = drawPath;
    if (points.length >= 3) {
      // 在 mask canvas 上填充闭合区域
      const mctx = maskRef.current!.getContext("2d")!;
      mctx.save();
      mctx.fillStyle = "rgba(255, 0, 0, 0.4)"; // 半透明红色显示选区
      mctx.beginPath();
      mctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++)
        mctx.lineTo(points[i].x, points[i].y);
      mctx.closePath();
      mctx.fill();
      mctx.restore();
    }
    // 清除预览
    previewRef.current
      ?.getContext("2d")!
      .clearRect(0, 0, previewRef.current!.width, previewRef.current!.height);
    setDrawPath([]);
  };

  // 绘制预览线条
  const drawPreview = (points: Array<{ x: number; y: number }>) => {
    const ctx = previewRef.current?.getContext("2d");
    if (!ctx || points.length < 2) return;
    ctx.clearRect(0, 0, previewRef.current!.width, previewRef.current!.height);
    ctx.save();
    ctx.strokeStyle = "rgba(255, 50, 50, 0.9)";
    ctx.lineWidth = lineWidth;
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

  // 将 canvas 转为 Uint8Array (RGBA)
  const canvasToRGBA = (c: HTMLCanvasElement) => {
    const ctx = c.getContext("2d")!;
    const imgd = ctx.getImageData(0, 0, c.width, c.height);
    return new Uint8Array(imgd.data.buffer);
  };

  const applyInpaint = async () => {
    if (!canvasRef.current || !maskRef.current) return;
    setProcessing(true);
    setShowOverlay(true);
    await new Promise((r) => setTimeout(r, 50)); // 让UI更新

    const canvas = canvasRef.current;
    const mask = maskRef.current;
    const w = canvas.width;
    const h = canvas.height;
    const imgBytes = canvasToRGBA(canvas);

    // 从 mask 的 alpha 通道提取选区
    const mctx = mask.getContext("2d")!;
    const mdata = mctx.getImageData(0, 0, w, h).data;
    const maskArr = new Uint8Array(w * h);
    for (let i = 0; i < w * h; i++) {
      maskArr[i] = mdata[i * 4 + 3] > 10 ? 1 : 0;
    }

    // 使用纯TS实现的inpaint算法
    const out = advancedInpaint(imgBytes, maskArr, w, h);

    // 输出到 canvas
    const ctx = canvas.getContext("2d")!;
    const outData = new Uint8ClampedArray(out.length);
    outData.set(out);
    ctx.putImageData(new ImageData(outData, w, h), 0, 0);

    // 清除 mask
    mctx.clearRect(0, 0, w, h);
    setProcessing(false);

    // 保持弹窗显示至少1秒后关闭
    setTimeout(() => {
      setShowOverlay(false);
    }, 1000);
  };

  // 改进的 inpaint 算法：动态半径边缘填充 + 高斯模糊
  const advancedInpaint = (
    imgBytes: Uint8Array,
    mask: Uint8Array,
    w: number,
    h: number
  ): Uint8Array => {
    const out = new Uint8Array(imgBytes);
    const filled = new Uint8Array(mask); // 1=需要填充
    const getIdx = (x: number, y: number) => (y * w + x) * 4;
    const pIdx = (x: number, y: number) => y * w + x;
    const inB = (x: number, y: number) => x >= 0 && x < w && y >= 0 && y < h;

    // 计算mask区域的最大尺寸，用于确定采样半径
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

    // 迭代从边缘向内填充，使用动态增加的采样半径
    let radius = 4;
    let maxIter = maskSize * 3;
    for (let iter = 0; iter < maxIter; iter++) {
      let changed = false;
      // 更快地增加采样半径
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

          // 使用当前半径采样周围像素
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

    // 确保所有mask像素都被填充（兜底：使用边界平均颜色）
    let remaining = 0;
    for (let i = 0; i < w * h; i++) if (filled[i] === 1) remaining++;
    if (remaining > 0) {
      // 收集边界颜色 - 扩大采样范围
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

    // 多次高斯模糊平滑过渡 - 增加到50次
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

  // 预设画笔大小
  const brushSizes = [2, 4, 6, 8];

  const downloadResult = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "result.png";
    a.click();
  };

  return (
    <div className="max-w-[1000px] mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 text-center">
        Watermark Remover
      </h2>

      {/* 未上传图片时显示大的上传按钮 */}
      {!img && (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-slate-800/50">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0] ?? undefined)}
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="px-8 py-6 text-lg font-semibold bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            📷 Upload Image
          </Button>
          <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm">
            Click to select an image file
          </p>
        </div>
      )}

      {/* 上传图片后显示工具栏 */}
      {img && (
        <>
          <div className="flex flex-wrap gap-4 mb-4 items-center justify-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0] ?? undefined)}
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="text-sm"
            >
              Change Image
            </Button>

            {/* 画笔大小选择 */}
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg">
              <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">
                Brush:
              </span>
              {brushSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setLineWidth(size)}
                  className={`flex items-center justify-center w-8 h-8 rounded-full transition-all ${
                    lineWidth === size
                      ? "bg-orange-500 shadow-md"
                      : "bg-white dark:bg-slate-600 hover:bg-gray-200 dark:hover:bg-slate-500"
                  }`}
                  title={`Brush size: ${size}px`}
                >
                  <div
                    className={`rounded-full ${
                      lineWidth === size
                        ? "bg-white"
                        : "bg-gray-700 dark:bg-gray-300"
                    }`}
                    style={{ width: size * 2, height: size * 2 }}
                  />
                </button>
              ))}
            </div>

            <Button variant="outline" onClick={clearMask}>
              Clear
            </Button>
            <Button
              onClick={applyInpaint}
              disabled={processing}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              {processing ? "Processing..." : "Remove Watermark"}
            </Button>
            <Button variant="outline" onClick={downloadResult}>
              Download
            </Button>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
            Draw a circle around the watermark, then click "Remove Watermark".
          </p>
        </>
      )}

      {/* Processing overlay */}
      {showOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col items-center gap-4 animate-in zoom-in-95 duration-300">
            <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
            <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
              Removing watermark...
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Please wait
            </p>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 1000, overflow: "auto" }}>
        <div
          style={{
            position: "relative",
            display: img ? "inline-block" : "none",
          }}
        >
          <canvas
            ref={canvasRef}
            style={{
              display: img ? "block" : "none",
              maxWidth: "100%",
              height: "auto",
            }}
          />
          {/* Mask canvas - stores the actual mask for inpaint */}
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
          {/* Preview canvas - 画圈预览 */}
          <canvas
            ref={previewRef}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              pointerEvents: "auto",
              width: "100%",
              height: "100%",
              cursor: "crosshair",
            }}
            onMouseDown={startDraw}
            onMouseUp={endDraw}
            onMouseLeave={endDraw}
            onMouseMove={onDraw}
          />
        </div>
      </div>
    </div>
  );
};

export default WatermarkEditor;
