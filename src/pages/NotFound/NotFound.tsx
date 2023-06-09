import { ReactElement, useEffect } from "react";
import { Link } from "react-router-dom";
import SectionDescription from "../../components/SectionDescription";
import SectionHeader from "../../components/SectionHeader";
import SectionStack from "../../components/SectionStack";

function NotFound({
  setTitle,
}: {
  setTitle: (title: string) => void;
}): ReactElement {
  useEffect(() => {
    setTitle("Page not Found");
  }, []);

  return (
    <SectionStack>
      <SectionHeader>Page not found</SectionHeader>
      <SectionDescription>
        Sorry! You seem to have navigated to a page that does not exist, oh no!
      </SectionDescription>
      <Link to="search">Go to the Search Page</Link>
    </SectionStack>
  );
}

export default NotFound;
