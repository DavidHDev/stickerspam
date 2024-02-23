import { useEffect, useState } from "react";
import { addSticker, clearStickersOnLimitReached, setLatestWinner } from "./firebase/firebase";
import { get, getDatabase, onValue, ref } from "@firebase/database";

import { Sticker } from "./Interfaces/Sticker";
import { getUserName } from "./utils";

import StickerPicker from "./components/StickerPicker/StickerPicker";
import StickerArea from "./components/StickerArea/StickerArea";
import NameModal from "./components/NameModal";

const App: React.FC = () => {
  const [positionedStickers, setPositionedStickers] = useState<Sticker[]>([]);
  const [winner, setWinner] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const database = getDatabase();
    const stickersRef = ref(database, 'stickers');
    const winnerRef = ref(database, 'winner');

    const getStickers = () => {
      get(stickersRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          if (data) {
            const stickers = Object.values(data);
            setPositionedStickers(stickers as Sticker[]);
          }
        }
      })
    }

    const getWinner = () => {
      get(winnerRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          if (data) {
            setWinner(data);
          }
        }
      })
    }

    getStickers();
    getWinner();

    onValue(stickersRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const stickers: Sticker[] = Object.values(data);
        const newSticker: Sticker[] = [stickers.pop()];
        setPositionedStickers((prevValue) => (
          [...prevValue, ...newSticker] as Sticker[]
        ))

        console.log(stickers.length)
        if (stickers.length + 1 === 33) {
          clearStickersOnLimitReached();
          setPositionedStickers([]);
          setLatestWinner(stickers.pop().placedBy);
          getWinner();
          getStickers();
        }
      }
    })

    if (!getUserName()) {
      setIsOpen(true);
    }
  }, [])

  return (
    <>
      <NameModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <StickerPicker onStickerSelected={addSticker} />
      <StickerArea stickers={positionedStickers} winner={winner} />
    </>
  );
};

export default App;
