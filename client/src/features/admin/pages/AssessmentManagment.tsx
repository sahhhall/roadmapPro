import  { useState } from 'react';
import Container from "@/components/Container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { StackList } from "@/features/assessment/components/admin/StackLists";
import { Link } from "react-router-dom";
import AssessmentResultTable from '../components/assessmentmangment/AssessmentResult';

const AssessmentManagement = () => {
  const [isAssessmentResult, setIsAssessmentResult] = useState(false);

  return (
    <Container>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link to="/admin">home</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link to="/admin/assessment-managment">
              assessment-management
            </Link>
          </BreadcrumbItem>
          {isAssessmentResult && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                assessment-results
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
      <main>
        <div className="flex justify-between items-center my-4">
          <h2 className="text-2xl font-semibold">
            {isAssessmentResult ? '' : ''}
          </h2>
          <div className="gap-2 flex">
            <Button 
              variant={isAssessmentResult ? "secondary" : "outline"}
              onClick={() => setIsAssessmentResult(!isAssessmentResult)}
            >
              {isAssessmentResult ? 'View Stacks' : 'Assessment Results'}
            </Button>
          </div>
        </div>
        
        {isAssessmentResult ? (
          <AssessmentResultTable />
        ) : (
          <StackList />
        )}
      </main>
    </Container>
  );
};

export default AssessmentManagement;