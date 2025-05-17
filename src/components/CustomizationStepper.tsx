
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = {
  label: string;
  icon: React.ReactNode;
};

type StepperProps = {
  steps: Step[];
  currentStep: number;
};

const CustomizationStepper = ({ steps, currentStep }: StepperProps) => {
  return (
    <div className="w-full">
      <div className="hidden md:flex items-center justify-center">
        <div className="flex items-center w-full max-w-4xl">
          {steps.map((step, index) => (
            <div key={step.label} className="flex-1 relative">
              <div className="flex flex-col items-center">
                <div 
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 z-10",
                    index < currentStep 
                      ? "bg-primary border-primary text-primary-foreground" 
                      : index === currentStep
                        ? "bg-background border-primary text-primary"
                        : "bg-background border-muted text-muted-foreground"
                  )}
                >
                  {index < currentStep ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    step.icon
                  )}
                </div>
                
                <span 
                  className={cn(
                    "mt-2 text-sm font-medium",
                    index <= currentStep ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>

                {index < steps.length - 1 && (
                  <div 
                    className={cn(
                      "absolute top-5 left-1/2 w-full h-0.5",
                      index < currentStep ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile view - just show current step */}
      <div className="md:hidden text-center">
        <span className="text-sm font-medium text-muted-foreground">
          Step {currentStep + 1} of {steps.length}:
        </span>
        <h3 className="text-lg font-semibold text-primary">
          {steps[currentStep].label}
        </h3>
      </div>
    </div>
  );
};

export default CustomizationStepper;
