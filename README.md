# mão certa

Marketplace de serviços para conectar clientes a profissionais verificados.

## Rodando localmente

1. Instale o Node.js 20 ou superior.
2. No diretório do projeto, execute `npm install`.
3. Inicie o ambiente com `npm run dev`.

## Ativando o backend

O app possui integração com Supabase, mas funciona com os dados locais enquanto as credenciais não forem informadas.

1. Crie um projeto em [supabase.com](https://supabase.com).
2. No SQL Editor do projeto, execute o conteúdo de `supabase/schema.sql`.
3. Copie `.env.example` para `.env.local`.
4. Preencha `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` com os valores de **Project URL** e **anon public key** em Project Settings > API.
5. Reinicie o servidor com `npm run dev`.

Com isso, os profissionais cadastrados serão salvos no banco e carregados novamente quando a página for aberta.

## O que já está no MVP

- Busca por serviço e localização
- Filtro por categorias
- Cards de profissionais com avaliações, preço e localização
- Favoritos com estado local
- Formulário de cadastro para profissionais
- Layout responsivo para celular e desktop

Sem as variáveis do Supabase, os dados locais continuam sendo usados como fallback para desenvolvimento.
