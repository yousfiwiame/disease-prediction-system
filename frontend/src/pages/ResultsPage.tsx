import { Diagnosis } from '@/App';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from '@/components/motion';
import { 
  ArrowLeft, 
  Info, 
  Shield, 
  Pill, 
  Activity,
  Apple, 
  HeartPulse,
  AlertTriangle
} from "lucide-react";

interface ResultsPageProps {
  diagnosis: Diagnosis;
  onReset: () => void;
}

export default function ResultsPage({ diagnosis, onReset }: ResultsPageProps) {
  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 text-center"
      >
        <div className="flex items-center justify-center mb-2">
          <HeartPulse className="h-10 w-10 text-primary mr-2" />
          <h1 className="text-4xl font-bold text-primary">Diagnosis Result</h1>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Card className="shadow-xl border-t-4 border-primary">
          <CardHeader className="bg-primary text-primary-foreground py-6 flex items-center justify-center">
            <h2 className="text-3xl font-bold tracking-tight">{diagnosis.disease}</h2>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-lg leading-relaxed">{diagnosis.description}</p>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ResultSection
            title="Precautions"
            icon={<Shield className="h-5 w-5" />}
            items={diagnosis.precautions}
            cardColor="bg-red-50 dark:bg-red-950/30"
            iconColor="text-red-600 dark:text-red-400"
            borderColor="border-red-300 dark:border-red-800"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ResultSection
            title="Medications"
            icon={<Pill className="h-5 w-5" />}
            items={diagnosis.medications}
            cardColor="bg-green-50 dark:bg-green-950/30"
            iconColor="text-green-600 dark:text-green-400"
            borderColor="border-green-300 dark:border-green-800"
            warning="Consult a doctor before taking any medication"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ResultSection
            title="Recommended Workouts"
            icon={<Activity className="h-5 w-5" />}
            items={diagnosis.workout}
            cardColor="bg-orange-50 dark:bg-orange-950/30"
            iconColor="text-orange-600 dark:text-orange-400"
            borderColor="border-orange-300 dark:border-orange-800"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ResultSection
            title="Dietary Recommendations"
            icon={<Apple className="h-5 w-5" />}
            items={diagnosis.diet}
            cardColor="bg-purple-50 dark:bg-purple-950/30"
            iconColor="text-purple-600 dark:text-purple-400"
            borderColor="border-purple-300 dark:border-purple-800"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center"
      >
        <Button 
          onClick={onReset} 
          variant="outline" 
          size="lg"
          className="flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Try Another Diagnosis
        </Button>
        
        <p className="mt-6 text-sm text-muted-foreground">
          This prediction is based on machine learning and should not replace professional medical advice.
          <br />
          Always consult with a healthcare provider for proper diagnosis and treatment.
        </p>
      </motion.div>
    </div>
  );
}

interface ResultSectionProps {
  title: string;
  icon: React.ReactNode;
  items: string[];
  cardColor: string;
  iconColor: string;
  borderColor: string;
  warning?: string;
}

function ResultSection({
  title,
  icon,
  items,
  cardColor,
  iconColor,
  borderColor,
  warning
}: ResultSectionProps) {
  return (
    <Card className={`${cardColor} border ${borderColor} h-full`}>
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <div className={`${iconColor} mr-2`}>{icon}</div>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <Separator className={borderColor} />
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-start">
              <div className={`${iconColor} mr-2 mt-0.5`}>
                <Info className="h-4 w-4" />
              </div>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        
        {warning && (
          <div className="mt-4 flex items-center text-amber-700 dark:text-amber-400 text-sm bg-amber-50 dark:bg-amber-950/40 p-2 rounded-md">
            <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{warning}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}