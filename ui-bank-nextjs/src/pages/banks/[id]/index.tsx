import Layout from "../../../components/Layout";
import classes from "./BankProfile.module.scss";
import { BankAccount, Transaction } from "../../../utils/model";
import Link from "next/link";
import { FunctionComponent } from "react";
import { GetServerSideProps, NextPage } from "next";
import { bankApi } from "../../../utils/http";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO"; 
import { BankAccountBalance } from "../../../components/utils/BankAccountBalance";

const Header: FunctionComponent<{bankAccount: BankAccount}> = (props) => {
    const { bankAccount } = props;
    return (
    <div className={`container ${classes.header}`}>
        <BankAccountBalance balance={bankAccount.balance} />
        <div className={classes.buttonActions}>
            <Link href="/banks/[id]/transactions" as={`/banks/${bankAccount.id}/transactions`}>
                <a className={`${classes.actionLink} bank001`}>
                    Realizar transferência
                </a>
            </Link>
            <Link href={"/banks/[id]/pix"} as={`/banks/${bankAccount.id}/pix`}>
                <a className={`${classes.actionLink} bank001`}>
                    Cadastrar chave pix
                </a>
            </Link>
        </div>
    </div>
    );
};

interface BankProfileProps {
    bankAccount: BankAccount;
    transactions: Transaction[];
}
const BankProfile: NextPage<BankProfileProps> = (props) => {
    const { bankAccount, transactions } = props;
    return (
        <Layout bankAccount={bankAccount}>
            <Header bankAccount={bankAccount} />
            <div>
                <h1 className={classes.titleTable}>Últimos lançamentos</h1>

                <table className={`table table-borderless table-striped ${classes.tableTransactions}`}>
                <thead>
                    <tr>
                    <th scope="col">Data</th>
                    <th scope="col" colSpan={3}>
                        Descrição
                    </th>
                    <th scope="col" className="text-right">
                        Valor (R$)
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((t, key) => (
                    <tr key={key}>
                        <td>{format(parseISO(t.created_at), "dd/MM")}</td>
                        <td colSpan={3}>{t.description}</td>
                        <td className="text-right">
                        {t.amount.toLocaleString("pt-BR")}
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </Layout>
    );
}
export default BankProfile;

export const getServerSideProps: GetServerSideProps = async (cxt) => {
    const {query: { id }} = cxt;
    console.log(id);
    const [{ data: bankAccount }, { data: transactions }] = await Promise.all([
      await bankApi.get(`bank-account/${id}`),
      await bankApi.get(`bank-accounts/${id}/transactions`),
    ]);
  
    return {props: {bankAccount, transactions}};
  };