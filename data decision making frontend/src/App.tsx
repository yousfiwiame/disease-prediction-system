import { useState } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import HomePage from '@/pages/HomePage';
import ResultsPage from '@/pages/ResultsPage';
import { mockSymptoms, mockDiagnosis } from '@/data/mockData';

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
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSymptomSelection = (symptoms: Symptom[]) => {
    setSelectedSymptoms(symptoms);
  };

  const handleGetDiagnosis = () => {
    if (selectedSymptoms.length === 0) return;
    
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setDiagnosis(mockDiagnosis);
      setIsLoading(false);
    }, 1500);
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
            symptoms={mockSymptoms}
            selectedSymptoms={selectedSymptoms}
            onSymptomSelection={handleSymptomSelection}
            onSubmit={handleGetDiagnosis}
            isLoading={isLoading}
          />
        ) : (
          <ResultsPage 
            diagnosis={diagnosis}
            onReset={handleReset}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;