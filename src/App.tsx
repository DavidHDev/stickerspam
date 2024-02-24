import { useEffect, useState } from "react";
import { addSticker, clearStickersOnLimitReached, setLatestWinner } from "./firebase/firebase";
import { get, getDatabase, onValue, ref } from "@firebase/database";

import { Sticker } from "./Interfaces/Sticker";
import { getLeaderboard, getStickerCount, getUserName } from "./utils";

import StickerPicker from "./components/StickerPicker/StickerPicker";
import StickerArea from "./components/StickerArea/StickerArea";
import NameModal from "./components/NameModal";
import WinnerMessage from "./components/WinnerMessage";

const App: React.FC = () => {
  const [positionedStickers, setPositionedStickers] = useState<Sticker[]>([]);
  const [winner, setWinner] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [leaderboard, setLeaderboard] = useState<string[]>([]);
  const [stickerCount, setStickerCount] = useState(null);
  const [isWinnerMessageVisible, setIsWinnerMessageVisible] = useState(false);

  useEffect(() => {
    const database = getDatabase();
    const stickersRef = ref(database, 'stickers');
    const winnerRef = ref(database, 'winner');

    const getStickers = () => {
      get(stickersRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          if (data) {
            const stickers = Object.values(data) as Sticker[];
            setPositionedStickers(stickers);
            setLeaderboard(getLeaderboard(stickers));
            setStickerCount(getStickerCount(stickers));
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
        // Display the statistics
        setLeaderboard(getLeaderboard(stickers));
        setStickerCount(getStickerCount(stickers));

        const newSticker: Sticker[] = [stickers.pop()];
        setPositionedStickers((prevValue) => (
          [...prevValue, ...newSticker] as Sticker[]
        ))

        if (stickers.length + 1 === 34) {
          setLatestWinner(getLeaderboard(stickers)[0].substring(4));
          setIsWinnerMessageVisible(true);

          setTimeout(() => {
            setLeaderboard([]);
            setIsWinnerMessageVisible(false);
            setStickerCount(null);
            setPositionedStickers([]);
          }, 5000)

          // clear state
          clearStickersOnLimitReached();
          // setLatestWinner(leaderboard[0].match(nameRegex)[1]);

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
      {isWinnerMessageVisible && (
        <WinnerMessage winner={winner} />
      )}

      <NameModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <StickerPicker onStickerSelected={addSticker} stickerCount={stickerCount} />
      <StickerArea stickers={positionedStickers} winner={winner} leaderboard={leaderboard} />
    </>
  );
};

export default App;
