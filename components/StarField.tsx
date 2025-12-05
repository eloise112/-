import React, { useMemo } from 'react';

const StarField: React.FC = () => {
  // Generate random cute elements
  const items = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 20 + 10, // Bigger sizes
      type: Math.random() > 0.5 ? 'star' : 'circle',
      color: Math.random() > 0.5 ? 'text-yellow-200' : 'text-orange-100',
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 5 + 5}s`
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {items.map((item) => (
        <div
          key={item.id}
          className={`absolute ${item.color} opacity-60`}
          style={{
            top: item.top,
            left: item.left,
            animation: `float ${item.duration} ease-in-out infinite`,
            animationDelay: item.delay,
          }}
        >
          {item.type === 'star' ? (
            <svg width={item.size} height={item.size} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ) : (
            <div 
              className="rounded-full bg-current" 
              style={{ width: item.size / 2, height: item.size / 2 }} 
            />
          )}
        </div>
      ))}
      
      {/* Big blurred decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 translate-y-1/2"></div>
    </div>
  );
};

export default StarField;