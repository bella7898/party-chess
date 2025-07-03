import { Chess, Move, Square } from "chess.js";
import { useAudioPlayer } from 'expo-audio';
import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import BoardView from "../components/BoardView";

import ConfettiCannon from 'react-native-confetti-cannon';
import { GLOBAL_STYLES } from "../constants/styles";

const movePlayer = useAudioPlayer(require("../assets/sounds/move-self.mp3"));
const capturePlayer = useAudioPlayer(require("../assets/sounds/capture.mp3"));

export default function ChessGame() {
  const [game, setGame] = useState(new Chess());
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [legalMoves, setLegalMoves] = useState<Square[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleOpenPopup = () => {
    setIsVisible(true);
  }

  const handleClosePopup = () => {
    setIsVisible(false);
  }

  const safeGameMutate = (modify: (game: Chess) => void) => {
    const updated = new Chess(game.fen()); // clone
    modify(updated);
    setGame(updated); // trigger rerender
  };

  const onSquarePress = async (square: Square) => {
    const piece = game.get(square);

     if (piece && piece.color === game.turn()) {
      setSelectedSquare(square);
      const moves = game.moves({ square, verbose: true }) as Move[];
      setLegalMoves(moves.map((m) => m.to));
      return; 
    }

    if (selectedSquare) {
      const move = game.move({ from: selectedSquare, to: square });

      if (move) {
        safeGameMutate((updatedGame) => {
          if (move.captured) {
            capturePlayer.seekTo(0);
            capturePlayer.play();
          } else {
            movePlayer.seekTo(0); 
            movePlayer.play();
          }

          if (updatedGame.isGameOver()){
            if (updatedGame.isCheckmate()){
              const loser = game.turn();
              const winner = loser === 'w' ? 'b' : 'w';
              const message = `Checkmate! Winner: ${winner === 'w'? 'White' : 'Black'}`;
              setPopupMessage(message);
              handleOpenPopup();
            }else{
              const message = "Game over: draw";
              setPopupMessage(message);
              handleOpenPopup();
            }
          } 
        }); // force update

        setSelectedSquare(null);
        setLegalMoves([]);
        return;
      }

      //if (square === selectedSquare) {
        setSelectedSquare(null);
        setLegalMoves([]);
        //return;
      //}
    }
  };

  const resetGame = () => {
    setGame(new Chess());
    setSelectedSquare(null);
    setLegalMoves([]);
  };

  return (
    <ScrollView 
        style={{ backgroundColor: "#383431", flex: 1}} 
        contentContainerStyle={{ 
            padding: 16, 
            flexGrow: 1, 
            justifyContent: "center",
        }}
    >
      <Text style={GLOBAL_STYLES.text}>
        ChessMate
      </Text>
      <BoardView 
        chess={game}
        onSquarePress={onSquarePress}
        selectedSquare={selectedSquare}
        legalMoves={legalMoves}
      />
      <View style={{ marginTop: 20}}>
        <Pressable style={GLOBAL_STYLES.button} onPress={resetGame}>
            <Text style={GLOBAL_STYLES.text}>Reset Game</Text>
        </Pressable>
      </View>
      <Modal visible={isVisible} transparent={true} animationType="fade">
        <TouchableOpacity style={GLOBAL_STYLES.modalBackground} activeOpacity={1} onPress={handleClosePopup}>
          <ConfettiCannon count={200} origin={{x:20, y: 20}} explosionSpeed={200} fadeOut={true} />
          <View style={GLOBAL_STYLES.popupContainer}>
            <Text style={GLOBAL_STYLES.popupText}>{popupMessage}</Text>
            <TouchableOpacity onPress={handleClosePopup} style={GLOBAL_STYLES.popupButton}>
              <Text style={GLOBAL_STYLES.text}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
}