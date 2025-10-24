import { useState } from "react";
import { useTranslations } from "../Context/TranslationsContext";
import { Translation, ManageModalMode } from "../Types/Translation"
import ManageTranslationModal from "../Components/Translations/ManageTranslationModal";
import "./Scss/Translations.scss"


function Translations() {
  const {
    translations,
    loading,
    error,
    // addTranslation,
    // updateTranslation,
    // deleteTranslation
  } = useTranslations();

  const [showManageModal, setShowManageModal] = useState(false);

  const [selectedTranslation, setSelectedTranslation] = useState<Translation | undefined>(undefined);
  const [selectedMode, setSelectedMode] = useState<ManageModalMode | undefined>(undefined)


  if (loading) return <p>Loading translations...</p>;

  return (
    <div className="Translations">
      <h3>Translations</h3>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <button
        onClick={() => {
          setSelectedMode(ManageModalMode.Create)
          setShowManageModal(true)
        }}
      >Create</button>
      <div className="List">
        <div className="Child Header">
          <p>Name</p>
          <p>Value</p>
        </div>
        {translations.map((t) => (
          <div 
            key={t.id}
            className="Child" 
            onClick={() => {
              setSelectedTranslation(t)
              setSelectedMode(ManageModalMode.Edit)
              setShowManageModal(true);
            }}
          >
            <p>{t.name}</p>
            <p>{t.value}</p>
          </div>
          ))}
      </div>
      {showManageModal && 
        <ManageTranslationModal
          onClose={() => {
            setShowManageModal(false)
            setSelectedTranslation(undefined)
          }}
          translation={selectedTranslation}
          mode={selectedMode}
      />}
    </div>
  );
}

export default Translations;