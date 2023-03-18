function CardLayout({children}) {
  return (
    <div className="max-sm:px-[2px] max-sm:justify-center flex items-center max-sm:mb-[140px]">
      <div className="flex flex-wrap max-sm:grid max-sm:grid-flow-dense max-sm:grid-cols-2 justify-items-center gap-y-0">
        {children}
      </div>
    </div>
  );
}

export default CardLayout;
