import Footer from "./Footer";
import MainContent from "./MainContent";
import Navbar from "./Navbar";
import BankAccountCard from "./utils/BankAccountCard";
import Title from "./utils/Title";

export default function Layout() {
    return (
        <div>
            <Navbar/>
            <MainContent>
                <Title>Contas bancárias</Title>
                <BankAccountCard/>
                <BankAccountCard/>
                <BankAccountCard/>
                <BankAccountCard/>
                <BankAccountCard/>
                <BankAccountCard/>
                <BankAccountCard/>
            </MainContent>
            <Footer/>
        </div>
    );
}