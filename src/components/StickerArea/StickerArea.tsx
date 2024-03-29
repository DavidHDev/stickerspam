
import { useRef } from 'react';
import { options } from '../../constants/stickers.constants';
import { Sticker } from '../../Interfaces/Sticker';

import './StickerArea.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { Tooltip } from '@nextui-org/react';

const StickerArea = ({ stickers, winner, leaderboard }) => {
    const constraintsRef = useRef(null);

    return (
        <div ref={constraintsRef} className='sticker-area-container'>
            <div className='flex flex-col items-end justify-between h-full p-5'>
                <div className='flex justify-end items-end flex-col gap-4'>
                    <div className='latest-winner w-fit shadow-md text-yellow-400'>Previous Winner - {winner || 'Loading'}</div>
                    <div className='count shadow-md w-fit'>Count - {stickers.length}</div>
                </div>
                <div className='flex flex-col bg-[#333] text-white shadow-md rounded-2xl py-2 px-4 capitalize items-start text-xs relative z-30'>
                    <p className='text-center uppercase text-yellow-400 select-none'>Leaderboard</p>
                    {leaderboard.map((item) => (
                        <span className='select-none'>{item}</span>
                    ))}
                </div>
            </div>
            {stickers.map((sticker: Sticker) => (
                <AnimatePresence>
                    <motion.span
                        className='placed-sticker'
                        key={`${sticker.position.y}${sticker.position.x}`}
                        style={{
                            position: 'absolute',
                            left: `${sticker.position.x}px`,
                            top: `${sticker.position.y}px`
                        }}
                        initial={{ opacity: 0, scale: 0, rotateZ: '180deg' }}
                        animate={{ opacity: 1, scale: 1, rotateZ: '0deg' }}
                        exit={{ opacity: 0 }}
                    >
                        <Tooltip
                            delay={0}
                            closeDelay={0}
                            placement='bottom'
                            content={`Placed by ${sticker.placedBy}`}
                            color="secondary"
                        >
                            <motion.img
                                drag
                                dragConstraints={constraintsRef}
                                src={options[sticker.type].src}
                                alt={`${sticker.type} sticker`}
                            />
                        </Tooltip>

                    </motion.span>
                </AnimatePresence>
            ))}
        </div>
    );
}

export default StickerArea;