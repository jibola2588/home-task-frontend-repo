
interface IconProps {
  icon: React.ElementType;
  handleClick?: () => void;
  width?: string;
  height?: string;
  className?: string;
}


function Icon({ icon: Icon, handleClick, width, height, className }: IconProps) {
  return (
    <div onClick={handleClick} className={`${width ? `w-[${width}] h-[${height}]` : ''} flex items-center justify-center`}>
      <Icon className={className} />
    </div>
  );
}

export default Icon;
