import Survey from "@/components/ui/testForm/page";
import { socialAnxietyQuestions } from "./data";

const socialAnxietyTest = () => {
  return (
    <>
      <Survey
        questions={socialAnxietyQuestions}
        title="Social Anxiety Test"
        short_desc="Do you often encounter social anxiety?"
        long_desc="Social Anxiety Test evaluates your comfort in social settings, identifying fears of judgment or avoidance behaviors associated with social anxiety."
      />
    </>
  );
};

export default socialAnxietyTest;
