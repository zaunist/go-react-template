import React, { useRef, useState, useCallback } from "react";
import {
  Download,
  ImagePlus,
  RefreshCw,
  FileImage,
  Trash2,
  Settings2,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import SEO from "@/components/SEO";

// 支持的图片格式
type ImageFormat = "jpeg" | "png" | "webp" | "gif" | "bmp" | "ico" | "avif";

interface FormatOption {
  value: ImageFormat;
  label: string;
  mimeType: string;
  extension: string;
  supportsQuality: boolean;
  supportsTransparency: boolean;
}

const formatOptions: FormatOption[] = [
  {
    value: "jpeg",
    label: "JPG / JPEG",
    mimeType: "image/jpeg",
    extension: "jpg",
    supportsQuality: true,
    supportsTransparency: false,
  },
  {
    value: "png",
    label: "PNG",
    mimeType: "image/png",
    extension: "png",
    supportsQuality: false,
    supportsTransparency: true,
  },
  {
    value: "webp",
    label: "WebP",
    mimeType: "image/webp",
    extension: "webp",
    supportsQuality: true,
    supportsTransparency: true,
  },
  {
    value: "gif",
    label: "GIF",
    mimeType: "image/gif",
    extension: "gif",
    supportsQuality: false,
    supportsTransparency: true,
  },
  {
    value: "bmp",
    label: "BMP",
    mimeType: "image/bmp",
    extension: "bmp",
    supportsQuality: false,
    supportsTransparency: false,
  },
  {
    value: "avif",
    label: "AVIF",
    mimeType: "image/avif",
    extension: "avif",
    supportsQuality: true,
    supportsTransparency: true,
  },
];

// 单个图片项
interface ImageItem {
  id: string;
  file: File;
  preview: string;
  originalFormat: string;
  width: number;
  height: number;
  size: number;
  converted?: {
    blob: Blob;
    url: string;
    size: number;
  };
}

export const ImageConverterEditorPage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [images, setImages] = useState<ImageItem[]>([]);
  const [targetFormat, setTargetFormat] = useState<ImageFormat>("png");
  const [quality, setQuality] = useState(85);
  const [converting, setConverting] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // 获取当前格式选项
  const currentFormatOption = formatOptions.find(
    (f) => f.value === targetFormat
  )!;

  // 处理文件上传
  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      const newImages: ImageItem[] = [];

      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) continue;

        const preview = URL.createObjectURL(file);

        // 获取图片尺寸
        const img = new Image();
        await new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.src = preview;
        });

        newImages.push({
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          file,
          preview,
          originalFormat: file.type.split("/")[1].toUpperCase(),
          width: img.width,
          height: img.height,
          size: file.size,
        });
      }

      setImages((prev) => [...prev, ...newImages]);

      // 清空 input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    []
  );

  // 删除单张图片
  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const image = prev.find((img) => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.preview);
        if (image.converted) {
          URL.revokeObjectURL(image.converted.url);
        }
      }
      return prev.filter((img) => img.id !== id);
    });
  }, []);

  // 清除所有图片
  const clearAll = useCallback(() => {
    images.forEach((img) => {
      URL.revokeObjectURL(img.preview);
      if (img.converted) {
        URL.revokeObjectURL(img.converted.url);
      }
    });
    setImages([]);
  }, [images]);

  // 转换单张图片
  const convertImage = useCallback(
    async (imageItem: ImageItem): Promise<Blob> => {
      const canvas = canvasRef.current;
      if (!canvas) throw new Error("Canvas not available");

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context not available");

      // 加载图片
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = imageItem.preview;
      });

      // 设置画布尺寸
      canvas.width = img.width;
      canvas.height = img.height;

      // 如果目标格式不支持透明度，先填充白色背景
      if (!currentFormatOption.supportsTransparency) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      // 绘制图片
      ctx.drawImage(img, 0, 0);

      // 转换为目标格式
      return new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Conversion failed"));
            }
          },
          currentFormatOption.mimeType,
          currentFormatOption.supportsQuality ? quality / 100 : undefined
        );
      });
    },
    [currentFormatOption, quality]
  );

  // 转换所有图片
  const convertAll = useCallback(async () => {
    if (images.length === 0) return;

    setConverting(true);

    try {
      const updatedImages = await Promise.all(
        images.map(async (img) => {
          try {
            const blob = await convertImage(img);
            const url = URL.createObjectURL(blob);

            // 清理之前的转换结果
            if (img.converted) {
              URL.revokeObjectURL(img.converted.url);
            }

            return {
              ...img,
              converted: {
                blob,
                url,
                size: blob.size,
              },
            };
          } catch (error) {
            console.error("Conversion error:", error);
            return img;
          }
        })
      );

      setImages(updatedImages);
    } finally {
      setConverting(false);
    }
  }, [images, convertImage]);

  // 下载单张图片
  const downloadImage = useCallback(
    (imageItem: ImageItem) => {
      if (!imageItem.converted) return;

      const link = document.createElement("a");
      link.href = imageItem.converted.url;
      const originalName = imageItem.file.name.replace(/\.[^/.]+$/, "");
      link.download = `${originalName}.${currentFormatOption.extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    [currentFormatOption]
  );

  // 下载所有图片
  const downloadAll = useCallback(() => {
    images.forEach((img) => {
      if (img.converted) {
        downloadImage(img);
      }
    });
  }, [images, downloadImage]);

  // 格式化文件大小
  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // 计算压缩率
  const getCompressionRate = (original: number, converted: number): string => {
    const rate = ((1 - converted / original) * 100).toFixed(1);
    return converted < original ? `-${rate}%` : `+${Math.abs(Number(rate))}%`;
  };

  return (
    <>
      <SEO
        title="Image Converter Editor - Convert Image Formats"
        description="Convert images between JPG, PNG, WebP, GIF, BMP, AVIF formats. Batch conversion supported with quality control."
        canonicalUrl="/tools/image-converter/editor"
        noindex={true}
      />
      <div
        className="min-h-screen pt-[66px]"
        style={{ backgroundColor: "var(--color-pixel-cream)" }}
      >
        {/* 隐藏的画布用于转换 */}
        <canvas ref={canvasRef} className="hidden" />

        {/* 主内容区 */}
        <div className="max-w-[1400px] mx-auto px-4 py-8">
          {/* 头部 - 像素风格 */}
          <div className="text-center mb-8">
            <div
              className="inline-block pixel-border-sm px-4 py-2 mb-4"
              style={{ backgroundColor: "var(--color-pixel-sky)" }}
            >
              <span className="font-bold text-sm uppercase">🔄 Converter</span>
            </div>
            <h1
              className="pixel-title text-3xl mb-2"
              style={{ color: "var(--color-pixel-black)" }}
            >
              IMAGE FORMAT CONVERTER
            </h1>
            <p className="font-medium" style={{ color: "#666" }}>
              Convert images between JPG, PNG, WebP, GIF, BMP, and more formats
            </p>
          </div>

          {/* 控制栏 - 像素风格 */}
          <div
            className="pixel-card p-4 mb-6"
            style={{ backgroundColor: "white" }}
          >
            <div className="flex flex-wrap items-center gap-4">
              {/* 上传按钮 */}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="pixel-btn-primary px-4 py-2 text-sm"
                style={{ backgroundColor: "var(--color-pixel-sky)" }}
              >
                <ImagePlus className="w-4 h-4" />
                ADD IMAGES
              </button>

              {/* 目标格式选择 */}
              <div className="flex items-center gap-2">
                <span
                  className="text-sm font-bold uppercase"
                  style={{ color: "var(--color-pixel-black)" }}
                >
                  Convert to:
                </span>
                <select
                  value={targetFormat}
                  onChange={(e) =>
                    setTargetFormat(e.target.value as ImageFormat)
                  }
                  className="pixel-select px-3 py-2 text-sm font-bold"
                >
                  {formatOptions.map((format) => (
                    <option key={format.value} value={format.value}>
                      {format.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 质量设置按钮 */}
              {currentFormatOption.supportsQuality && (
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="pixel-border-sm px-3 py-2 text-sm font-bold flex items-center gap-2"
                  style={{ backgroundColor: "var(--color-pixel-lavender)" }}
                >
                  <Settings2 className="w-4 h-4" />
                  QUALITY: {quality}%
                </button>
              )}

              {/* 操作按钮 */}
              <div className="ml-auto flex items-center gap-2">
                {images.length > 0 && (
                  <>
                    <button
                      onClick={clearAll}
                      className="pixel-border-sm px-3 py-2 text-sm font-bold flex items-center gap-1"
                      style={{
                        backgroundColor: "var(--color-pixel-coral)",
                        color: "white",
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                      CLEAR ALL
                    </button>
                    <button
                      onClick={convertAll}
                      disabled={converting}
                      className="pixel-btn-primary px-4 py-2 text-sm"
                      style={{ backgroundColor: "var(--color-pixel-sky)" }}
                    >
                      <RefreshCw
                        className={`w-4 h-4 ${
                          converting ? "animate-spin" : ""
                        }`}
                      />
                      {converting ? "CONVERTING..." : "CONVERT ALL"}
                    </button>
                    {images.some((img) => img.converted) && (
                      <button
                        onClick={downloadAll}
                        className="pixel-btn-mint px-4 py-2 text-sm"
                      >
                        <Download className="w-4 h-4" />
                        DOWNLOAD ALL
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* 质量滑块 - 像素风格 */}
            {showSettings && currentFormatOption.supportsQuality && (
              <div
                className="mt-4 pt-4 border-t-2"
                style={{ borderColor: "var(--color-pixel-black)" }}
              >
                <div className="flex items-center gap-4 max-w-md">
                  <span
                    className="text-sm font-bold uppercase w-16"
                    style={{ color: "var(--color-pixel-black)" }}
                  >
                    Quality:
                  </span>
                  <Slider
                    value={[quality]}
                    onValueChange={([v]) => setQuality(v)}
                    min={10}
                    max={100}
                    step={5}
                    className="flex-1"
                  />
                  <span
                    className="text-sm font-bold w-12 text-right"
                    style={{ color: "var(--color-pixel-lavender)" }}
                  >
                    {quality}%
                  </span>
                </div>
                <p className="text-xs mt-2" style={{ color: "#666" }}>
                  Higher quality = larger file size. Recommended: 80-90% for
                  most uses.
                </p>
              </div>
            )}
          </div>

          {/* 图片列表 */}
          {images.length === 0 ? (
            /* 空状态 - 上传区域 - 像素风格 */
            <div
              className="pixel-card p-16 text-center cursor-pointer hover:translate-x-1 hover:translate-y-1 transition-transform"
              style={{ backgroundColor: "white" }}
              onClick={() => fileInputRef.current?.click()}
            >
              <div
                className="w-20 h-20 mx-auto mb-4 pixel-border-sm flex items-center justify-center"
                style={{ backgroundColor: "var(--color-pixel-sky)" }}
              >
                <FileImage className="w-10 h-10 text-white" />
              </div>
              <h3
                className="pixel-title text-xl mb-2"
                style={{ color: "var(--color-pixel-black)" }}
              >
                DROP IMAGES HERE
              </h3>
              <p className="mb-4 font-medium" style={{ color: "#666" }}>
                Support JPG, PNG, WebP, GIF, BMP, TIFF, ICO, AVIF formats
              </p>
              <button className="pixel-btn-secondary px-6 py-2">
                SELECT IMAGES
              </button>
            </div>
          ) : (
            /* 图片网格 - 像素风格 */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="pixel-card overflow-hidden"
                  style={{ backgroundColor: "white" }}
                >
                  {/* 图片预览 */}
                  <div
                    className="relative aspect-video flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-pixel-cream)" }}
                  >
                    <img
                      src={img.converted ? img.converted.url : img.preview}
                      alt="Preview"
                      className="max-w-full max-h-full object-contain"
                    />
                    {/* 格式标签 */}
                    <div className="absolute top-2 left-2 flex gap-1">
                      <span
                        className="pixel-border-sm px-2 py-1 text-xs font-bold"
                        style={{
                          backgroundColor: "var(--color-pixel-black)",
                          color: "white",
                        }}
                      >
                        {img.originalFormat}
                      </span>
                      {img.converted && (
                        <>
                          <span
                            className="px-1 py-1 text-xs font-bold"
                            style={{ color: "var(--color-pixel-black)" }}
                          >
                            →
                          </span>
                          <span
                            className="pixel-border-sm px-2 py-1 text-xs font-bold"
                            style={{
                              backgroundColor: "var(--color-pixel-sky)",
                              color: "white",
                            }}
                          >
                            {currentFormatOption.extension.toUpperCase()}
                          </span>
                        </>
                      )}
                    </div>
                    {/* 删除按钮 */}
                    <button
                      onClick={() => removeImage(img.id)}
                      className="absolute top-2 right-2 w-8 h-8 pixel-border-sm flex items-center justify-center text-white transition-colors"
                      style={{ backgroundColor: "var(--color-pixel-coral)" }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* 图片信息 */}
                  <div className="p-4">
                    <p
                      className="text-sm font-bold truncate mb-2"
                      style={{ color: "var(--color-pixel-black)" }}
                      title={img.file.name}
                    >
                      {img.file.name}
                    </p>
                    <div
                      className="flex items-center justify-between text-xs mb-3"
                      style={{ color: "#666" }}
                    >
                      <span className="font-medium">
                        {img.width} × {img.height}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {formatSize(img.size)}
                        </span>
                        {img.converted && (
                          <>
                            <span>→</span>
                            <span
                              className="font-bold"
                              style={{ color: "var(--color-pixel-sky)" }}
                            >
                              {formatSize(img.converted.size)}
                            </span>
                            <span
                              className={`pixel-border-sm px-1.5 py-0.5 text-xs font-bold ${
                                img.converted.size < img.size ? "" : ""
                              }`}
                              style={{
                                backgroundColor:
                                  img.converted.size < img.size
                                    ? "var(--color-pixel-mint)"
                                    : "var(--color-pixel-orange)",
                              }}
                            >
                              {getCompressionRate(img.size, img.converted.size)}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* 操作按钮 */}
                    <div className="flex gap-2">
                      {img.converted ? (
                        <button
                          onClick={() => downloadImage(img)}
                          className="flex-1 pixel-btn-mint px-3 py-2 text-xs"
                        >
                          <Download className="w-4 h-4" />
                          DOWNLOAD
                        </button>
                      ) : (
                        <button
                          onClick={async () => {
                            setConverting(true);
                            try {
                              const blob = await convertImage(img);
                              const url = URL.createObjectURL(blob);
                              setImages((prev) =>
                                prev.map((i) =>
                                  i.id === img.id
                                    ? {
                                        ...i,
                                        converted: {
                                          blob,
                                          url,
                                          size: blob.size,
                                        },
                                      }
                                    : i
                                )
                              );
                            } finally {
                              setConverting(false);
                            }
                          }}
                          disabled={converting}
                          className="flex-1 pixel-btn-primary px-3 py-2 text-xs"
                          style={{ backgroundColor: "var(--color-pixel-sky)" }}
                        >
                          <RefreshCw
                            className={`w-4 h-4 ${
                              converting ? "animate-spin" : ""
                            }`}
                          />
                          CONVERT
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* 添加更多图片卡片 - 像素风格 */}
              <div
                className="pixel-card overflow-hidden cursor-pointer hover:translate-x-1 hover:translate-y-1 transition-transform flex items-center justify-center min-h-[280px]"
                style={{ backgroundColor: "white" }}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="text-center p-6">
                  <div
                    className="w-16 h-16 mx-auto mb-2 pixel-border-sm flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-pixel-sky)" }}
                  >
                    <ImagePlus className="w-8 h-8 text-white" />
                  </div>
                  <p
                    className="text-sm font-bold uppercase"
                    style={{ color: "var(--color-pixel-black)" }}
                  >
                    Add more images
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 格式说明 - 像素风格 */}
          <div
            className="mt-8 pixel-card p-6"
            style={{ backgroundColor: "white" }}
          >
            <h3
              className="pixel-title text-lg mb-4"
              style={{ color: "var(--color-pixel-black)" }}
            >
              FORMAT GUIDE
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div
                className="pixel-border-sm p-3"
                style={{ backgroundColor: "var(--color-pixel-cream)" }}
              >
                <span
                  className="font-bold"
                  style={{ color: "var(--color-pixel-black)" }}
                >
                  JPG/JPEG
                </span>
                <p className="mt-1" style={{ color: "#666" }}>
                  Best for photographs. Smaller file size with lossy
                  compression.
                </p>
              </div>
              <div
                className="pixel-border-sm p-3"
                style={{ backgroundColor: "var(--color-pixel-cream)" }}
              >
                <span
                  className="font-bold"
                  style={{ color: "var(--color-pixel-black)" }}
                >
                  PNG
                </span>
                <p className="mt-1" style={{ color: "#666" }}>
                  Supports transparency. Lossless quality, larger file size.
                </p>
              </div>
              <div
                className="pixel-border-sm p-3"
                style={{ backgroundColor: "var(--color-pixel-cream)" }}
              >
                <span
                  className="font-bold"
                  style={{ color: "var(--color-pixel-black)" }}
                >
                  WebP
                </span>
                <p className="mt-1" style={{ color: "#666" }}>
                  Modern format with great compression. Supports transparency.
                </p>
              </div>
              <div
                className="pixel-border-sm p-3"
                style={{ backgroundColor: "var(--color-pixel-cream)" }}
              >
                <span
                  className="font-bold"
                  style={{ color: "var(--color-pixel-black)" }}
                >
                  GIF
                </span>
                <p className="mt-1" style={{ color: "#666" }}>
                  Limited to 256 colors. Supports simple animations.
                </p>
              </div>
              <div
                className="pixel-border-sm p-3"
                style={{ backgroundColor: "var(--color-pixel-cream)" }}
              >
                <span
                  className="font-bold"
                  style={{ color: "var(--color-pixel-black)" }}
                >
                  BMP
                </span>
                <p className="mt-1" style={{ color: "#666" }}>
                  Uncompressed format. Large file size, highest quality.
                </p>
              </div>
              <div
                className="pixel-border-sm p-3"
                style={{ backgroundColor: "var(--color-pixel-cream)" }}
              >
                <span
                  className="font-bold"
                  style={{ color: "var(--color-pixel-black)" }}
                >
                  AVIF
                </span>
                <p className="mt-1" style={{ color: "#666" }}>
                  Next-gen format with excellent compression. Limited support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageConverterEditorPage;
