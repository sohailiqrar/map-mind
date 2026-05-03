import Survey from "@/app/components/ui/testForm/page";
import { optimismQuestions } from "./data";

const optimismTest = () => {
  return (
    <>
      <Survey
        questions={optimismQuestions}
        title="Optimism Test"
        short_desc="Are you an optimistic person?"
        long_desc="Optimism Test determines the ability to expect positive outcomes, assessing overall outlook and resilience toward life's challenges."
      />
    </>
  );
};

export default optimismTest;
