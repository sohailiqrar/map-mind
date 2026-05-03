import Survey from "@/app/components/ui/testForm/page";
import { introExtroQuestions } from "./data";

const introExtroTest = () => {
  return (
    <>
      <Survey
        questions={introExtroQuestions}
        title="Introversion/Extroversion Test"
        short_desc="Find out whether you are introvert or extrovert."
        long_desc="Introversion/ Extroversion Test determines where you fall on the spectrum of introversion and extroversion, based on social preferences and energy levels."
      />
    </>
  );
};

export default introExtroTest;
