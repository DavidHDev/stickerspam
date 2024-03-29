import { useState } from 'react';
import { options } from '../../constants/stickers.constants';

import minilogo from '../../assets/minilogo.svg';
import './StickerPicker.scss';
import { Badge, Divider } from '@nextui-org/react';

const StickerPicker = ({ onStickerSelected, stickerCount }) => {
  const [lastPlacementTime, setLastPlacementTime] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <div className='sticker-picker-container'>
      <img className='mini-logo mb-2' src={minilogo} alt='mini logo' />
      <Divider className='divider' />
      {Object.values(options).map((sticker) => (
        <Badge content={stickerCount && stickerCount[sticker?.type] || 0} color="secondary">
          <img
            onClick={() => {
              const currentTime = new Date().getTime();

              if (!isDisabled) {
                setIsDisabled(true);
                setTimeout(() => {
                  setIsDisabled(false);
                }, 1000)
              }

              if (currentTime - lastPlacementTime >= 1000) {
                onStickerSelected(sticker.type);
                setLastPlacementTime(currentTime);
              }
            }}
            className={`${isDisabled ? 'sticker sticker-disabled' : 'sticker'}`}
            key={sticker.type}
            src={sticker.src}
            alt={`${sticker.type} sticker`}
          />
        </Badge>
      ))}
    </div>
  );
}

export default StickerPicker;