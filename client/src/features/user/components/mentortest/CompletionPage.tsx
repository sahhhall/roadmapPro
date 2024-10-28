interface ICompletionPageProps {
  score: number;
}
const CompletionPage: React.FC<ICompletionPageProps> = ({
  score,
}) => {
  return (
    <div>
      <p>{score}</p>
      <p>
        {score> 4
          ? "wait fro admin review"
          : "soory you can try again after 90 days"}
      </p>
    </div>
  );
};

export default CompletionPage;
