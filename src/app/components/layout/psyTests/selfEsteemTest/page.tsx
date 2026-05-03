import Survey from "@/app/components/ui/testForm/page";
import { selfEsteemQuestions } from "./data";

const selfEsteemTest = () => {
  return (
    <>
      <Survey
        questions={selfEsteemQuestions}
        title="Self Esteem Test"
        short_desc="Do you have a low self esteem?"
        long_desc="Self-esteem test measures how positively or negatively you perceive yourself, assessing your confidence."
      />
    </>
  );
};

export default selfEsteemTest;
