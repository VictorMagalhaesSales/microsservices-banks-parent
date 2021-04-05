
## ui-bank-nextjs
Microservice frontend que consome a aplicação feita em NestJS para as suas devidas operações bancárias.

# Bibliotecas utilizadas
- **react-hook-form**: gerenciamento e validação de formulários;
- **axios**: comunicação HTTP;
- **bootstrap**: estilização de componentes;
- **date-fns**: validação de datas;
- **sweetalert2**: exibição de alertas;

## Estrutura de pastas

```bash
+--components                       # Componentes compartilhados
+--utils                            # Arquivos utilitários
+--pages                            # Pasta dos componentes de roteamento
|   \--banks                        # Rota única da aplicação e main component - listagem de bancos
|       \--[id]                     # Rota e componente de profile dos bancos
|           \--pix                  # Rota e componente de cadastro de pix
|           \--transactions         # Rota e componente de transações
```

# Rodando a aplicação:
```bash
npm run dev
# or
docker-compose up
```
