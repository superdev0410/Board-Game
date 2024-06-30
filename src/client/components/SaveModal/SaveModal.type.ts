import { Game } from "@/client/utils/type";

export interface SaveModalProps {
  isOpen: boolean;
  game: Game;
  onClose: () => void;
}
