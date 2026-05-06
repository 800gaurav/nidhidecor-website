export const StatCard = ({
  title,
  value,
  icon,
  gradient,
  onClick,
  clickable = false,
  compact = false,
  className = "",
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl p-4 shadow-sm hover:shadow-md 
        transition-all duration-200 border border-gray-100 
        min-h-[90px] flex flex-col justify-between 
        ${clickable ? "hover:-translate-y-1 cursor-pointer" : ""} 
        ${className}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <p className="text-gray-500 text-xs font-semibold mb-1 tracking-wide">
            {title}
          </p>

          <h3
            className={`font-bold text-gray-900 leading-tight
              ${compact ? "text-lg" : "text-xl sm:text-2xl"}`}
          >
            {value}
          </h3>
        </div>

        {icon && (
          <div
            className="p-2 rounded-xl flex-shrink-0 ml-3"
            style={{ background: gradient }}
          >
            {icon}
          </div>
        )}
      </div>

      <div
        className="h-1.5 mt-3 rounded-full"
        style={{ background: gradient }}
      ></div>
    </div>
  );
};




// Compact Offer Card

export const OfferCard = ({ subtitle, title, desc, reward, progress, icon, color, total, current }) => (
  <div className={`rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-2 border-red-500`}
    style={{ 
      background: color,
      boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
    }}
  >
    {/* Limited Time Badge */}
    <div className="flex justify-between items-start mb-3">
      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
        ⚡ LIMITED TIME OFFER
      </div>
      <div className="bg-white bg-opacity-30 p-2 rounded-lg shadow-md">
        {icon}
      </div>
    </div>

    <div className="mb-3">
      <h1 className="font-black text-xl mb-2 text-yellow-300 drop-shadow-md">
        {reward}
      </h1>
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <h3 className="font-extrabold text-red-300 text-lg mb-2 border-b border-red-400 pb-1">
        {subtitle}
      </h3>
      <p className="text-sm opacity-95 leading-relaxed bg-black bg-opacity-20 p-2 rounded-lg">
        {desc}
      </p>
    </div>

    {/* Progress Section */}
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold">Progress</span>
        <span className="text-sm font-bold bg-red-600 px-2 py-1 rounded-lg">
          {current}/{total}
        </span>
      </div>
      <div className="bg-white bg-opacity-25 h-3 rounded-full overflow-hidden shadow-inner">
        <div
          className="bg-gradient-to-r from-yellow-400 to-red-500 h-full rounded-full transition-all duration-500 ease-out shadow-lg"
          style={{ 
            width: `${Math.min((progress || 0) * 100, 100)}%`,
            boxShadow: '0 0 10px rgba(255, 255, 0, 0.5)'
          }}
        />
      </div>
    </div>

    {/* Urgency Indicator */}
    <div className="flex items-center justify-center mt-3 text-red-200 text-xs font-semibold">
      <div className="flex items-center gap-1 ">
        <span>🔥</span>
        <span>HURRY! OFFER ENDING SOON</span>
        <span>🔥</span>
      </div>
    </div>
  </div>
);

// Compact Clickable Info Item
export const ClickableInfoItem = ({ label, value, icon, link }) => (
  <div
    className="bg-gray-50 p-2 rounded-lg border border-gray-100 flex items-center cursor-pointer hover:bg-gray-100 transition text-sm"
    onClick={() => navigate(link)}
  >
    <div className="mr-2 p-1 bg-white rounded-full shadow-xs text-gray-600">{icon}</div>
    <div>
      <p className="text-gray-600 text-xs">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  </div>
);
