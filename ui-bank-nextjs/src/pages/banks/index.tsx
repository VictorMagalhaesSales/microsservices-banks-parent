import { GetServerSideProps, NextPage } from "next";
import Layout from "../../components/Layout";
import BankAccountCard from "../../components/utils/BankAccountCard";
import { BankAccount } from "../../utils/model";
import { bankApi } from "../../utils/http";
import Link from 'next/link'

const BankList: NextPage<{bankAccounts: BankAccount[]}> = (props) => {
    const { bankAccounts } = props;

    return (
        <Layout>
            <h1>Contas bancárias</h1>
            <div className="row">
                {bankAccounts.map(bank => (
                    <Link href="banks/[id]" as={`/banks/${bank.id}`}>
                        <a className="col-12 col-sm-6 col-md4">
                            <BankAccountCard bankAccount={bank}/>
                        </a>
                    </Link>
                ))}
            </div>
        </Layout>
    );
}
export default BankList;

export const getServerSideProps: GetServerSideProps = async () => {
    const { data: bankAccounts } = await bankApi.get('bank-account');
    return {props: {bankAccounts}};
}