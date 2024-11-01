import Container from "@/components/Container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import QuestionList from "@/features/assessment/components/admin/QuestionList";

import { Link } from "react-router-dom";
const QuestionListPage = () => {
  return (
    <Container>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link to={"/admin"}>home</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link to={"/admin/assessment-managment"}>
              assessment-management
            </Link>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <main>
        <div className="flex justify-between">
          <p></p>
        </div>
        <QuestionList/>
      </main>
    </Container>
  );
};

export default QuestionListPage;
