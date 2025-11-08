import { ManageModalMode } from "./Generic";

export interface Translation {
  id: string;
  name: string;
  value: string;
}

export type ManageTranslationModalProps = {
  onClose: () => void;
  translation?: Translation;
  mode?: ManageModalMode;
  addTranslation: (newItem: { name: string; value: string }) => Promise<void>;
  updateTranslation: (id: string, updated: { name: string; value: string }) => Promise<void>;
  deleteTranslation: (id: string) => Promise<void>;
}