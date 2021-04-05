import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Layout from "../../../../components/Layout";
import Card from "../../../../components/utils/Card";
import Button from "../../../../components/utils/forms/Button";
import FormButtonActions from "../../../../components/utils/forms/FormButtonActions";
import Input from "../../../../components/utils/forms/Input";
import PixKeyCard from "../../../../components/utils/PixKeyCard";
import Title from "../../../../components/utils/Title";
import { BankAccount, PixKey } from "../../../../utils/model";
import { bankApi } from "../../../../utils/http";// @flow
import classes from "./PixRegister.module.scss";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Modal from "../../../../utils/modal";

interface PixRegisterProps {
    pixKeys: PixKey[];
    bankAccount: BankAccount;
  }
  
const PixRegister: NextPage<PixRegisterProps> = (props) => {
    const { pixKeys, bankAccount } = props;
    const {query: { id }, push } = useRouter();
    const { register, handleSubmit } = useForm();

    async function onSubmit(data) {
        try{
          await bankApi.post(`banks/${id}/pix-keys`, data);
          Modal.fire({
            title: 'Chave cadastrada com sucesso',
            icon: 'success'
          });
          push(`/banks/${id}`);
        }catch(e){
          console.error(e);
          Modal.fire({
            title: 'Ocorreu um erro. Verifique o console',
            icon: 'error'
          });
        }
    }
    
    return (
    <Layout bankAccount={bankAccount}>
        <div className="row">
            <div className="col-sm-6">
                <Title>Cadastrar chave Pix</Title>
                <Card>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <p className={classes.kindInfo}>Escolha um tipo de chave</p>
                        <Input name="kind" type="radio" labelText="CPF" value="cpf" ref={register} />
                        <Input name="kind" type="radio" labelText="E-mail" value="email" ref={register}/>
                        <Input name="key" labelText="Digite a chave" ref={register} />
                        <FormButtonActions>
                            <Button type="submit">Cadastrar</Button>
                            <Link href="/banks/[id]" as={`/banks/${id}`}>
                                <Button type="button" variant="info">
                                    Voltar
                                </Button>
                            </Link>
                        </FormButtonActions>
                    </form>
                </Card>
            </div>
            <div className="col-sm-4 offset-md-2">
                <Title>Minhas chaves pix</Title>
                {pixKeys.map((p, key) => (
                    <PixKeyCard key={key} pixKey={p} />
                ))}
            </div>
        </div>
    </Layout>
    );
};
  
export default PixRegister;
  
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const {query: { id }} = ctx;
    const [{ data: pixKeys }, {data: bankAccount}] = await Promise.all([
        await bankApi.get(`bank-accounts/${id}/pix-keys`),
        await bankApi.get(`bank-account/${id}`),
    ]);
    
      return {props: { pixKeys, bankAccount }};
};
  