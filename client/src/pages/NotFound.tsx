import Container from "@/components/Container";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import notfound from "@/assets/images/404.png";

const NotFound = () => {
  return (
    <Container>
      <Avatar>
        <AvatarImage src={notfound} className="rounded-full w-full h-full" />
      </Avatar>
    </Container>
  );
};

export default NotFound;
