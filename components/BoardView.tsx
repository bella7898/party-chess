import { ChessInstance, Square } from "chess.js";
import { useMemo } from "react";
import { Image, Pressable, View } from "react-native";

import { COLORS } from "../constants/styles";

type BoardViewProps = {
  chess: ChessInstance;
  selectedSquare?: Square | null;
  legalMoves?: Square[];
  onSquarePress?: (square: Square) => void;
};

function getPieceImage(piece: { type: string; color: string }) {
  const fileName = `${piece.color}${piece.type.toUpperCase()}`; // eg. "wK"
  return imageMap[fileName];
}

// Dynamically import all images
const imageMap: Record<string, any> = {
  wK: require("../assets/pieces/wK.png"),
  wQ: require("../assets/pieces/wQ.png"),
  wR: require("../assets/pieces/wR.png"),
  wB: require("../assets/pieces/wB.png"),
  wN: require("../assets/pieces/wN.png"),
  wP: require("../assets/pieces/wP.png"),
  bK: require("../assets/pieces/bK.png"),
  bQ: require("../assets/pieces/bQ.png"),
  bR: require("../assets/pieces/bR.png"),
  bB: require("../assets/pieces/bB.png"),
  bN: require("../assets/pieces/bN.png"),
  bP: require("../assets/pieces/bP.png"),
};

export default function BoardView({ chess, onSquarePress, selectedSquare, legalMoves }: BoardViewProps) {
  const board = useMemo(() => chess.board(), [chess]);

  return (
    <View style={{ aspectRatio: 1, width: "100%", flexDirection: "column" }}>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={{ flex: 1, flexDirection: "row" }}>
          {row.map((square, colIndex) => {
            const file = "abcdefgh"[colIndex];
            const rank = 8 - rowIndex;
            const squareName = `${file}${rank}` as Square;

            const isSelected = selectedSquare === squareName;
            const isLegal = legalMoves?.includes(squareName);

            const baseColor = (rowIndex + colIndex) % 2 === 0 ? COLORS.lightSquare : COLORS.darkSquare;

            return (
                <Pressable
                    key={colIndex}
                    onPress={() => onSquarePress?.(squareName)}
                    style={{
                        flex: 1,
                        backgroundColor: baseColor,
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: isSelected ? 2 : 0,
                        borderColor: isSelected ? "#f8c32c" : "transparent",
                    }}
                >
                    {square && (
                        <Image
                        source={getPieceImage(square)}
                        style={{ width: "100%", height: "100%", resizeMode: "contain" }}
                        />
                    )}
                    {isLegal && !square && (
                        <View
                            style={{
                                width: 12,
                                height: 12,
                                borderRadius: 6,
                                backgroundColor: "rgba(0,0,0,0.4)",
                            }}
                        />
                    )}
                    {isLegal && square && (
                        <View
                        style={{
                            width: "80%",
                            height: "80%",
                            borderRadius: 999,
                            borderWidth: 3,
                            borderColor: "rgba(0,0,0,0.3)",
                            position: "absolute",
                        }}
                        />
                    )}
                </Pressable>
            );
            })}
        </View>
      ))}
    </View>
  );
}
