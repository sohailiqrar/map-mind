import Survey from "@/components/ui/testForm/page";
import { narcissismQuestions } from "./data";

const narcissismTest = () => {
  return (
    <>
      <Survey
        questions={narcissismQuestions}
        title="Narcissism Test"
        short_desc="How narcissistic are you?"
        long_desc="Narcissism Test assesses levels of self-centeredness, empathy, and admiration-seeking behaviors linked to narcissistic traits."
      />
    </>
  );
};

export default narcissismTest;
