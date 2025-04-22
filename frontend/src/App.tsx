import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import HomePage from "@/pages/HomePage";
import ResultsPage from "@/pages/ResultsPage";
import axios from "axios";

export type Symptom = string;

export interface Diagnosis {
  disease: string;
  description: string;
  precautions: string[];
  medications: string[];
  workout: string[];
  diet: string[];
}

function App() {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingSymptoms, setLoadingSymptoms] = useState(true); // For managing symptom loading state


  const handleSymptomSelection = (symptoms: Symptom[]) => {
    setSelectedSymptoms(symptoms);
  };

  // Fetch symptoms from the backend
  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/symptoms");
        setSymptoms(response.data.symptoms);
      } catch (error) {
        console.error("Failed to fetch symptoms:", error);
      } finally {
        setLoadingSymptoms(false); // Stop loading state after fetching
      }
    };
    fetchSymptoms();
  }, []);

  const handleGetDiagnosis = async () => {
    if (selectedSymptoms.length === 0) return;

    setIsLoading(true);

    console.log("symptoms",selectedSymptoms)

    try {
      const response = await axios.post("http://localhost:5000/api/predict", {
        symptoms: selectedSymptoms,
      });

      console.log("response", response)

      const data = response.data;

      if (data.error) {
        console.error("Error from API:", data.error);
        setDiagnosis(null);
      } else {
        setDiagnosis({
          disease: data.disease,
          description: data.description,
          precautions: data.precautions,
          medications: data.medications,
          workout: data.workout,
          diet: data.diet,
        });
      }
    } catch (error) {
      console.error("API request failed:", error);
      setDiagnosis(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setDiagnosis(null);
    setSelectedSymptoms([]);
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="disease-prediction-theme">
      <div className="min-h-screen bg-background">
        {!diagnosis ? (
          <HomePage
          symptoms={symptoms}
          selectedSymptoms={selectedSymptoms}
          onSymptomSelection={handleSymptomSelection}
          onSubmit={handleGetDiagnosis}
          isLoading={isLoading}
          loadingSymptoms={loadingSymptoms}
          />
        ) : (
          <ResultsPage diagnosis={diagnosis} onReset={handleReset} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
