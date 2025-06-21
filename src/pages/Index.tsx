import { useEffect } from "react";

// i need to maybe update this page (the content is just a fallback if you fail to update the page)

const Index = () => {
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };
    window.addEventListener("resize", setVh);
    setVh();
    return () => window.removeEventListener("resize", setVh);
  }, []);

  return (
    <div className="min-h-[calc(var(--vh)*100)] flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Blank App</h1>
        <p className="text-xl text-gray-600">Start building your amazing project here!</p>
      </div>
    </div>
  );
};

export default Index;
