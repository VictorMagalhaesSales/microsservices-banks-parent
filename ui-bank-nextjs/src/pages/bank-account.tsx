import { GetServerSideProps, NextPage } from "next";
import Layout from "../components/Layout";
import BankAccountCard from "../components/utils/BankAccountCard";
import { BankAccount } from "../models/model";
import { bankApi } from "../utils/http";

interface BankAccountsListProps {
    bankAccounts: BankAccount[];
}

const BankAccountsList: NextPage<BankAccountsListProps> = (props) => {
    const { bankAccounts } = props;

    return (
        <Layout>
            <h1>Contas bancárias</h1>
            <div className="row">
                {bankAccounts.map(bank => (
                    <a className="col-12 col-sm-6 col-md4">
                        <BankAccountCard bankAccount={bank}/>
                    </a>
                ))}
            </div>
        </Layout>
    );
}

export default BankAccountsList;

export const getServerSideProps: GetServerSideProps = async () => {
    const { data: bankAccounts } = await bankApi.get('bank-account');
    return {props: {bankAccounts}};
}