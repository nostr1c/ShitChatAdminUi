export interface Translation {
  id: string;
  name: string;
  value: string;
}

export type ManageTranslationModalProps = {
  onClose: () => void;
  translation?: Translation;
  mode?: ManageModalMode
}

export enum ManageModalMode {
  Edit,
  Create
}