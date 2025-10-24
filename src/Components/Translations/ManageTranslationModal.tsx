import { useState } from "react";
import { ManageModalMode, ManageTranslationModalProps } from "../../Types/Translation"
import "./Scss/ManageTranslationModal.scss"
import { useTranslations } from "../../Context/TranslationsContext";

function ManageTranslationModal({ onClose, translation, mode }: ManageTranslationModalProps) {
  const [formData, setFormData] = useState({
    name: translation?.name || "",
    value: translation?.value || ""
  })

  const { addTranslation, updateTranslation, deleteTranslation } = useTranslations();

  const handleSubmit = async () => {
    if (!formData.name || !formData.value) return;
    if (mode === ManageModalMode.Create)
      await addTranslation(formData);

    if (mode === ManageModalMode.Edit && translation)
      await updateTranslation(translation.id, formData);

    onClose();
  }

  const handleDelete = async () => {
    if (translation && mode === ManageModalMode.Edit)
      await deleteTranslation(translation.id)

    onClose();
  }

  return (
    <div className="ManageTranslation">
      <div className="Wrapper">
        <h4>{mode !== undefined ? ManageModalMode[mode] : ""}</h4>
        <div className="Inputs">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({...prev, name: e.target.value}))}
          />
          <input
            type="text"
            placeholder="Name"
            value={formData.value}
            onChange={(e) => setFormData((prev) => ({...prev, value: e.target.value}))}
          />
        </div>

        <div className="Buttons">
          <button onClick={handleSubmit}>
            Save
          </button>
          {mode === ManageModalMode.Edit && (
            <button onClick={handleDelete} className="Delete">
              Delete
            </button>
          )}
        </div>
      </div>
      <div
        className="Overlay" 
        onClick={onClose}
      />
    </div>
  )
}

export default ManageTranslationModal;