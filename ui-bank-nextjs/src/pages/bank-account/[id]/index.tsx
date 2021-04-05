import Layout from "../../../components/Layout";
import classes from "./BankAccountDashboard.module.scss";
import { BankAccount, Transaction } from "../../../utils/model";
import Link, { LinkProps } from "next/link";
import { FunctionComponent, useContext } from "react";
import { GetServerSideProps, NextPage } from "next";
import { bankApi } from "../../../utils/http";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO"; 
import { BankAccountBalance } from "../../../components/utils/BankAccountBalance";
import BankContext from "../../../context/BankContext";

interface ActionLinkProps extends LinkProps {}
const ActionLink: FunctionComponent<ActionLinkProps> = (props) => {
    const { children, ...rest } = props;
    const bank = useContext(BankContext);
    return (
        <Link {...rest}>
            <a className={`${classes.actionLink} bank001`}>{children}</a>
        </Link>
    );
};

interface HeaderProps {
    bankAccount: BankAccount;
}
const Header: FunctionComponent<HeaderProps> = (props) => {
    const { bankAccount } = props;
    return (
        <div className={`container ${classes.header}`}>
            <BankAccountBalance balance={bankAccount.balance} />
            <div className={classes.buttonActions}>
                <ActionLink href="/bank-account/[id]/pix/transactions/register" 
                    as={`/bank-account/${bankAccount.id}/pix/transactions/register`}>
                    Realizar transferência
                </ActionLink>
                <ActionLink href={"/bank-account/[id]/pix/register"} 
                    as={`/bank-account/${bankAccount.id}/pix/register`}>
                    Cadastrar chave pix
                </ActionLink>
            </div>
        </div>
    );
};

interface BankAccountDashboardProps {
    bankAccount: BankAccount;
    transactions: Transaction[];
}
const BankAccountDashboard: NextPage<BankAccountDashboardProps> = (props) => {
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

export default BankAccountDashboard;

export const getServerSideProps: GetServerSideProps = async (cxt) => {
    const {query: { id }} = cxt;
    console.log(id);
    const [{ data: bankAccount }, { data: transactions }] = await Promise.all([
      await bankApi.get(`bank-account/${id}`),
      await bankApi.get(`bank-accounts/${id}/transactions`),
    ]);
  
    return {props: {bankAccount, transactions}};
  };