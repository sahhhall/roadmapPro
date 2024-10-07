import Container from "@/components/Container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Usertable from "@/features/admin/components/usermanagment/Usertable";
import { Link } from "react-router-dom";

const UserManagment = () => {
  return (
    <Container className="m-3">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link to={"/admin"}>
              <BreadcrumbLink>home</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link to={"/admin/user-management"}>
              <BreadcrumbLink>user-management</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <main>
        <h1 className=" flex justify-center font-extrabold text-2xl tracking-wide mt-4">
          User Manament
        </h1>
        <p className=" flex justify-center  text-xs  ">
          Mange your users and thier account permissions here
        </p>
        <Usertable />
      </main>
    </Container>
  );
};

export default UserManagment;
