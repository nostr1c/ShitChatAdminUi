import { useEffect, useState } from "react";
import { Translation } from "../Types/Translation"
import ManageTranslationModal from "../Components/Translations/ManageTranslationModal";
import "./Scss/Translations.scss"
import { ManageModalMode } from "../Types/Generic";
import axios from "../Api/axiosInstance";

function Translations() {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showManageModal, setShowManageModal] = useState(false);
  const [selectedTranslation, setSelectedTranslation] = useState<Translation | undefined>(undefined);
  const [selectedMode, setSelectedMode] = useState<ManageModalMode | undefined>(undefined)


  const fetchTranslations = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/translation");
      setTranslations(res.data.data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    } 
  };
  
  const addTranslation = async (newItem: Omit<Translation, "id">) => {
    const res = await axios.post("/translation", newItem);
    setTranslations((prev) => [...prev, res.data.data]);
  };

  const updateTranslation = async (id: string, updated: Omit<Translation, "id">) => {
    await axios.put(`/translation/${id}`, updated);
    setTranslations((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));
  };

  const deleteTranslation = async (id: string) => {
    await axios.delete(`/translation/${id}`);
    setTranslations((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    fetchTranslations();
  }, []);

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
          addTranslation={addTranslation}
          updateTranslation={updateTranslation}
          deleteTranslation={deleteTranslation}
      />}
    </div>
  );
}

export default Translations;