import Survey from "@/app/components/ui/testForm/page";
import { angerManagementQuestions } from "./data";

const angerMangaementTest = () => {
  return (
    <>
      <Survey
        questions={angerManagementQuestions}
        title="Anger Management Test"
        short_desc="Do anger issues get the best of you?"
        long_desc="Anger Management Test measures how you manage, express, and control anger, providing insight into potential anger issues."
      />
    </>
  );
};

export default angerMangaementTest;
