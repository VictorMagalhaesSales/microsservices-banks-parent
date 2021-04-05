import { BankAccount } from "../utils/model";
import Footer from "./Footer";
import MainContent from "./MainContent";
import Navbar from "./Navbar";


const Layout: React.FunctionComponent<{bankAccount?: BankAccount}> = (props) => {
    const { bankAccount } = props;
    return (
      <>
        <Navbar bankAccount={bankAccount} />
        <MainContent>{props.children}</MainContent>
        <Footer />
      </>
    );
};
export default Layout;
  