import { AppProvider } from "@pixi/react";
import CulinaryGame from "components/culinary-quest/culinaryGame";

function GameCulinaryQuest() {
  return (
    <AppProvider>
      <CulinaryGame />
    </AppProvider>
  );
}

export default GameCulinaryQuest;
