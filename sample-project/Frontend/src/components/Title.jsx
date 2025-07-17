const Header = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="header">
      <div className="header-content">
        <div className="header-center">
          <h1 className="header-title">
            ✨ Todo App
          </h1>
          <p className="header-date">
            {currentDate}
          </p>
          <p className="header-subtitle">
            Stay organized and achieve your goals
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;