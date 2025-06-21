import { useState, useRef, useEffect } from 'react';

interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  triggerType?: 'hover' | 'click';
}

export const MyPopover = ({
  trigger,
  children,
  placement = 'bottom',
  triggerType = 'hover',
}: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Handle outside clicks
  useEffect(() => {
    if (triggerType !== 'click') return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current && 
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [triggerType]);

  // Handle hover events
  const hoverProps = triggerType === 'hover' ? {
    onMouseEnter: () => setIsOpen(true),
    onMouseLeave: () => setIsOpen(false),
  } : {};

  // Handle click events
  const clickProps = triggerType === 'click' ? {
    onClick: () => setIsOpen(!isOpen),
  } : {};

  // Placement classes
  const placementClasses = {
    top: 'bottom-full mb-2 left-1/2 transform -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 transform -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 transform -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 transform -translate-y-1/2',
  };

  return (
    <div className="relative inline-block" ref={popoverRef}>
      {/* Trigger element */}
      <div
        ref={triggerRef}
        className="inline-block"
        aria-haspopup="true"
        aria-expanded={isOpen}
        {...hoverProps}
        {...clickProps}
      >
        {trigger}
      </div>

      {/* Popover content */}
      {isOpen && (
        <div
          className={`
            absolute z-50
            min-w-[200px]
            bg-white rounded-lg shadow-lg border border-gray-200
            p-3
            ${placementClasses[placement]}
            animate-fade-in
          `}
          role="tooltip"
        >
          {children}
          {triggerType === 'click' && (
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setIsOpen(false)}
              aria-label="Close popover"
            >
              ×
            </button>
          )}
        </div>
      )}
    </div>
  );
};