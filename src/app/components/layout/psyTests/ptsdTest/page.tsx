import Survey from "@/app/components/ui/testForm/page";
import { ptsdQuestions } from "./data";

const ptsdTest = () => {
  return (
    <>
      <Survey
        questions={ptsdQuestions}
        title="Post Traumatic Stress Disorder Test"
        short_desc="Do you have a PTSD?"
        long_desc="Post Traumatic Stress Disorder Tes assesses symptoms like flashbacks and avoidance linked to traumatic experiences.
"
      />
    </>
  );
};

export default ptsdTest;
