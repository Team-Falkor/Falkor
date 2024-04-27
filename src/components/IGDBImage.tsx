import { IGDBImageSize } from '@/@types';
import { FC, ImgHTMLAttributes } from 'react';

interface IGDBImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  imageSize?: IGDBImageSize;
  imageId: string;
  alt: string;
}

const IGDBImage: FC<IGDBImageProps> = ({ imageSize = 'original', imageId, alt, ...restProps }) => {
  const src = `https://images.igdb.com/igdb/image/upload/t_${imageSize}/${imageId}.png`;

  return (
    <img
      src={src}
      alt={alt}
      {...restProps}
    />
  );
};

export default IGDBImage;
