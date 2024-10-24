import Container from "@/components/Container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { CreateStackModal } from "@/features/assessment/components/admin/modals/CreateStackModal";
import { useState } from "react";
import { Link } from "react-router-dom";
const AssessmentManagment = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const openDialog = () => setDialogOpen(true);
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
          <p>sdf</p>
          <div className="gap-2 flex">
            <Button variant={"outline"}>Assessment Results</Button>
            <Button onClick={openDialog} variant={"outline"}>
              Create Stack
            </Button>
          </div>
        </div>
      </main>
      <CreateStackModal setDialogOpen={setDialogOpen} dialogOpen={dialogOpen} />
    </Container>
  );
};

export default AssessmentManagment;
