import { Button } from '@/components/ui/button';
import React from 'react';
import { useNavigate } from 'react-router-dom';


interface ICompletionPageProps {
  userName?: string;
  score: number;
  passingScore:number;
}

const CompletionPage: React.FC<ICompletionPageProps> = ({ userName = "Sahal Kk", score ,passingScore}) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black flex items-center  text-white p-8">
      <div className="max-w-[50%] ">
        <div className="mb-12">
          <h1 className="text- font-semibold">RoadMapPro</h1>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-gray-300 mb-2">Hey {userName},</p>
            <h2 className="text-4xl font-bold mb-4">
              You {score >= passingScore ? "passed" : "failed"} the test
            </h2>
          </div>
          
          <p className="text-gray-400 text-xs">
            {score >= 4 ? (
              "Congratulations! You have successfully passed the mentor test with a score that meets our requirements. Please note that it will take some time to process your certificates and eligibility. We will notify you once this is complete. Once your eligibility is confirmed, you will unlock exclusive mentor-supported features that will enhance your experience and capabilities."
            ) : (
              "Unfortunately, you did not meet the required score for passing. You can try again after 30 days. Use this time to improve your skills and knowledge."
            )}
          </p>
          
          <Button 
          variant={'default'}
          className='w-full '
          onClick={()=> navigate('/')}
          >
            Ok
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompletionPage;