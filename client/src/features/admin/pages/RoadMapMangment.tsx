import Container from "@/components/Container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import RoadMaps from "@/features/roadmaps/components/admin/RoadMaps";
import { useState } from "react";
import { Link } from "react-router-dom";
import RequestsModal from "../components/roadmap/RequestsModal";
const RoadMapMangment = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);
  return (
    <Container>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link to={"/admin"}>home</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link to={"/admin/user-management"}>roadmap-management</Link>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <main className="flex items-center flex-col">
        <h1 className=" flex justify-center font-extrabold text-2xl tracking-wide mt-4">
          Roadmap Managment
        </h1>
        <p className=" flex justify-center  text-xs  ">
          Mange your users and thier account permissions here
        </p>
        <Button
          className="dark:bg-transparent sm:w-30 mt-3"
          variant="submit"
          onClick={openDialog}
        >
          Roadmap Requests
        </Button>
        <RequestsModal dialogOpen={dialogOpen} closeDialog={closeDialog} />
        <RoadMaps   />
      </main>
    </Container>
  );
};

export default RoadMapMangment;
