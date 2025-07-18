import Survey from "@/components/ui/testForm/page";
import { emotionalIntelligenceQuestions } from "./data";

const emotionalIntelligenceTest = () => {
  return (
    <>
      <Survey
        questions={emotionalIntelligenceQuestions}
        title="Emotional Intelligence Test"
        short_desc="Are you an Emotional Intelligenct person?"
        long_desc="Emotional Intelligence Test measures your ability to recognize, understand, and manage both your own emotions and those of others."
      />
    </>
  );
};

export default emotionalIntelligenceTest;
