import { Translation } from "../Types/Translation";
import { ApiResponse } from "../Types/Generic";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "../Api/axiosInstance";

interface TranslationsContextType {
  translations: Translation[];
  loading: boolean;
  error: string | null;
  fetchTranslations: () => Promise<void>;
  addTranslation: (newItem: Omit<Translation, "id">) => Promise<void>;
  updateTranslation: (id: string, updated: Omit<Translation, "id">) => Promise<void>;
  deleteTranslation: (id: string) => Promise<void>;
}

const TranslationsContext = createContext<TranslationsContextType | undefined>(undefined);

export const TranslationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTranslations = async () => {
    setLoading(true);
    try {
      const response = await axios.get<ApiResponse<Translation[]>>("/translation");
      setTranslations(response.data.data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTranslation = async (newItem: Omit<Translation, "id">) => {
    try {
      const response = await axios.post<ApiResponse<Translation>>("/translation", newItem);
      setTranslations((prev) => [...prev, response.data.data]);
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };

  const updateTranslation = async (id: string, updated: Omit<Translation, "id">) => {
    try {
      await axios.put(`/translation/${id}`, updated);
      setTranslations((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteTranslation = async (id: string) => {
    try {
      await axios.delete(`/translation/${id}`);
      setTranslations((prev) => prev.filter((t) => t.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTranslations();
  }, []);

  return (
    <TranslationsContext.Provider
      value={{
        translations,
        loading,
        error,
        fetchTranslations,
        addTranslation,
        updateTranslation,
        deleteTranslation,
      }}
    >
      {children}
    </TranslationsContext.Provider>
  );
};

export const useTranslations = () => {
  const ctx = useContext(TranslationsContext);
  if (!ctx) throw new Error("useTranslations must be used within a TranslationsProvider");
  return ctx;
};