import Container from "@/components/Container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Usertable from "@/features/admin/components/usermanagment/Usertable";


const UserManagment = () => {
  return (
    <Container className="m-3">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Brea  dcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <main>
        <h1 className=" flex justify-center font-extrabold text-2xl tracking-wide mt-4">User Manament</h1>
        <p className=" flex justify-center  text-xs  ">Mange your users and thier account permissions here</p>
          <Usertable/>
      </main>
    </Container>
  );  
};

export default UserManagment;
