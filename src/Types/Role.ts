import { ManageModalMode } from "./Generic";

export interface Role {
  id: string;
  name: string;
}

export type ManageRoleModalProps = {
  onClose: () => void;
  role?: Role;
  mode?: ManageModalMode
}