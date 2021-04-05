import { GetServerSideProps, NextPage } from "next";
import Layout from "../../components/Layout";
import BankAccountCard from "../../components/utils/BankAccountCard";
import { BankAccount } from "../../utils/model";
import { bankApi } from "../../utils/http";
import Link from 'next/link'

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
                    <Link href="bank-account/[id]" as={`/bank-account/${bank.id}`}>
                        <a className="col-12 col-sm-6 col-md4">
                            <BankAccountCard bankAccount={bank}/>
                        </a>
                    </Link>
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