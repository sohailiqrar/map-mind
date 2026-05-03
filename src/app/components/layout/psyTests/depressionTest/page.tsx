import Survey from "@/app/components/ui/testForm/page";
import { depressionQuestions } from "./data";

const depressionTest = () => {
  return (
    <>
      <Survey
        questions={depressionQuestions}
        title="Depression Test"
        short_desc="Do you have a Depression?"
        long_desc="Depression Test evaluates symptoms like sadness, lack of energy, and low motivation to help identify possible depression levels."
      />
    </>
  );
};

export default depressionTest;
