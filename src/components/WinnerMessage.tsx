import ReactConfetti from "react-confetti";

const WinnerMessage = ({ winner }) => {
    return (
        <div>
            <ReactConfetti className="confetti" />
            <div className="winner-name text-center">
                <h1 className="font-bold text-4xl text-yellow-400 bg-[#333] p-4 rounded-lg mb-6 capitalize">
                    {winner}
                </h1>
                <p className="font-bold mb-2">Has won this round!</p>
                <p>Resetting...</p>
            </div>
        </div>
    );
}

export default WinnerMessage;