import Layout from "../components/Layout";
import BankAccountCard from "../components/utils/BankAccountCard";

export default function BankAccountList() {
    return (
        <Layout>
            <h1>Contas bancárias</h1>
            <div className="row">
                <a className="col-12 col-sm-6 col-md4">
                <BankAccountCard bankAccount={{
                    id: 'teste', owner_name: 'Victor', balance: 0, account_number: '1111'
                }}/>
                </a>
            </div>
        </Layout>
    );
}