import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Image as ImageIcon, Loader2, Download, Sparkles } from 'lucide-react';

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const response = await ai.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '1:1',
        },
      });

      const images = response.generatedImages;
      if (images && images.length > 0) {
        setImageUrl(`data:image/jpeg;base64,${images[0].image.imageBytes}`);
      } else {
        throw new Error("No image was generated. Please try a different prompt.");
      }
    } catch (err: any) {
      console.error("Error generating image:", err);
      setError(err.message || "Failed to generate image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = `ai-generated-image-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section id="ai-image" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Sparkles className="text-emerald-400" size={32} />
            AI Image Generator
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-emerald-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Describe what you want to see, and our AI will generate a unique image for you in seconds.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-slate-900 rounded-2xl border border-slate-700 p-6 md:p-8 shadow-2xl">
          <form onSubmit={generateImage} className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A futuristic city with flying cars at sunset..."
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-medium rounded-xl px-8 py-4 hover:shadow-lg hover:shadow-emerald-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[160px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <ImageIcon size={20} />
                    Generate
                  </>
                )}
              </button>
            </div>
            {error && (
              <p className="text-red-400 mt-3 text-sm">{error}</p>
            )}
          </form>

          <div className="relative aspect-square w-full max-w-xl mx-auto bg-slate-800 rounded-xl border border-slate-700 overflow-hidden flex items-center justify-center group">
            {imageUrl ? (
              <>
                <img 
                  src={imageUrl} 
                  alt={prompt} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={handleDownload}
                    className="bg-white text-slate-900 font-medium rounded-lg px-6 py-3 flex items-center gap-2 hover:bg-slate-100 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
                  >
                    <Download size={20} />
                    Download Image
                  </button>
                </div>
              </>
            ) : (
              <div className="text-slate-500 flex flex-col items-center gap-4 p-8 text-center">
                {isLoading ? (
                  <>
                    <Loader2 size={48} className="animate-spin text-emerald-500" />
                    <p>Creating your masterpiece...</p>
                  </>
                ) : (
                  <>
                    <ImageIcon size={48} className="opacity-50" />
                    <p>Your generated image will appear here</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
