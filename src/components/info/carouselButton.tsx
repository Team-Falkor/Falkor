import { Button } from '@/components/ui/button';
import { useCarousel } from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FC } from 'react';

interface CarouselButtonProps {
  direction: 'left' | 'right';
}

const CarouselButton: FC<CarouselButtonProps> = ({ direction }) => {
  const { scrollNext, scrollPrev, canScrollNext, canScrollPrev } = useCarousel();

  return (
    <Button
      variant={'ghost'}
      size={'icon'}
      onClick={direction === 'left' ? scrollPrev : scrollNext}
      disabled={direction === 'left' ? !canScrollPrev : !canScrollNext}
    >
      {direction === 'left' ? <ChevronLeft className="size-6" /> : <ChevronRight className="size-6" />}
    </Button>
  );
};

export default CarouselButton;
