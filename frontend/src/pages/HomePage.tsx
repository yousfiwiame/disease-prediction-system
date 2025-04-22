import { useState } from 'react';
import { Symptom } from '@/App';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from '@/components/motion';
import { 
  HeartPulse, 
  AlertCircle, 
  ChevronRight
} from "lucide-react";


interface HomePageProps {
  symptoms: Symptom[];
  selectedSymptoms: Symptom[];
  onSymptomSelection: (symptoms: Symptom[]) => void;
  onSubmit: () => void;
  isLoading: boolean;
  loadingSymptoms: boolean;
}

export default function HomePage({
  symptoms,
  selectedSymptoms,
  onSymptomSelection,
  onSubmit,
  isLoading,
  loadingSymptoms
}: HomePageProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSymptoms = symptoms.filter(symptom => 
    symptom.replace('_', ' ').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSymptomToggle = (symptom: Symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      onSymptomSelection(selectedSymptoms.filter(s => s !== symptom));
    } else {
      onSymptomSelection([...selectedSymptoms, symptom]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  if (loadingSymptoms) {
    return <div className="flex justify-center items-center">
      <p className="text-lg text-muted-foreground">Loading symptoms...</p>
    </div>;
  }

  return (
     
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center mb-2">
          <HeartPulse className="h-10 w-10 text-primary mr-2" />
          <h1 className="text-4xl font-bold text-primary">MediPredict</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Advanced Disease Prediction System
        </p>
      </motion.div>

     
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <form onSubmit={handleSubmit}>
          <Card className="shadow-lg border-t-4 border-t-primary">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl flex items-center">
                <HeartPulse className="h-6 w-6 mr-2 text-primary" />
                Select Your Symptoms
              </CardTitle>
              <CardDescription>
                Choose all the symptoms you're experiencing for an accurate diagnosis
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Search symptoms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-1">
                <div className="flex justify-between items-center px-3 py-2">
                  <span className="text-sm font-medium">Available Symptoms</span>
                  <span className="text-sm text-primary font-medium">
                    {selectedSymptoms.length} selected
                  </span>
                </div>

                <ScrollArea className="h-72 rounded-md border">
                  <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                    {filteredSymptoms.map((symptom) => (
                      <div 
                        key={symptom}
                        className="flex items-center space-x-2 p-2 hover:bg-muted rounded-md transition-colors"
                      >
                        <Checkbox
                          id={symptom}
                          checked={selectedSymptoms.includes(symptom)}
                          onCheckedChange={() => handleSymptomToggle(symptom)}
                        />
                        <label
                          htmlFor={symptom}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer select-none"
                        >
                          {symptom.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {selectedSymptoms.length === 0 && (
                <div className="flex items-center mt-4 p-2 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-200 rounded-md">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <span className="text-sm">Please select at least one symptom</span>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-between border-t pt-4">
              <p className="text-sm text-muted-foreground">
                <AlertCircle className="h-3 w-3 inline mr-1" />
                For medical emergencies, please contact a healthcare professional.
              </p>
              <Button 
                type="submit" 
                disabled={selectedSymptoms.length === 0 || isLoading}
                className="flex items-center"
              >
                {isLoading ? "Analyzing..." : "Get Diagnosis"}
                {!isLoading && <ChevronRight className="ml-1 h-4 w-4" />}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 text-center text-sm text-muted-foreground"
      >
        <p>
          This system uses machine learning to predict diseases based on symptoms.
          <br />The prediction is based on patterns and should not replace professional medical advice.
        </p>
      </motion.div>

            
    </div>         
  );
}