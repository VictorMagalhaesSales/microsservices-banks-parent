import Footer from "./Footer";
import MainContent from "./MainContent";
import Navbar from "./Navbar";
import BankAccountCard from "./utils/BankAccountCard";
import Title from "./utils/Title";

export default function Layout(props) {
    return (
        <div>
            <Navbar/>
            <MainContent>{props.children}</MainContent>
            <Footer/>
        </div>
    );
}