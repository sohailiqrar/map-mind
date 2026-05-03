import Survey from "@/app/components/ui/testForm/page";
import { mentalHealthquestions } from "./data";

const mentalHealthTest = () => {
  return (
    <>
      <Survey
        questions={mentalHealthquestions}
        title="Mental Health Test"
        short_desc="How is your mental health today?"
        long_desc="Mental health assesses overall psychological well-being, identifying potential signs of mental health issues affecting daily functioning."
      />
    </>
  );
};

export default mentalHealthTest;
