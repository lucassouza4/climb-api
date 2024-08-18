# Análise de Requisitos para o Sistema de Escalada

## 1. Visão Geral do Sistema

O sistema é uma plataforma de escalada onde usuários podem gerenciar suas atividades, visualizar rankings, adicionar boulders aos seus perfis, e interagir com a comunidade. Agora, além do ranking de escaladores, o sistema também inclui rankings de boulders e vias mais escalados.

## 2. Requisitos Funcionais

### 1. Autenticação e Autorização

- [ ] Registro, login, recuperação de senha e autenticação via redes sociais.
- [ ] Controle de acesso baseado em níveis de permissão (usuário comum, usuário com permissão elevada, usuário de última instância).

### 2. Perfil de Usuário

- [ ] Visualização e edição do perfil com informações como nome, foto, histórico de atividades, e conquistas.
- [ ] Exibição do ranking atual do usuário nas modalidades de via e boulder.

### 3. Ranking de Escaladores

- [ ] Rankings semanais, mensais e anuais, separados por via e boulder, com critérios de pontuação como:
  - [ ] **Flash**: Bônus de pontuação para ascensões realizadas na primeira tentativa.
  - [ ] **Grau de Dificuldade**: Pontuação base de acordo com a dificuldade do boulder ou via.
  - [ ] **Tentativas**: Penalidades ou reduções na pontuação para tentativas adicionais após o flash.
  - [ ] **Tempo de Conclusão**: Pontos adicionais para conclusões mais rápidas.
  - [ ] **Quantidade de Boulders/Vias Concluídos**: Pontuação acumulada por quantidade de boulders ou vias completadas em um período.

### 4. Ranking de Boulders e Vias

- [ ] **Rankings Temporais**: O sistema deve gerar rankings semanais, mensais e anuais para os boulders e vias mais escalados.
- [ ] **Critérios de Classificação**:
  - [ ] **Número de Ascensões**: Contagem de quantas vezes um boulder ou via foi completado por diferentes usuários.
  - [ ] **Popularidade**: Considerações adicionais como avaliações positivas e comentários frequentes.
- [ ] **Separação de Modalidades**: Rankings distintos para boulders e vias.

### 5. Gestão de Boulders

- [ ] **Níveis de Permissão**:
  - [ ] **Usuário Comum**: Pode adicionar boulders existentes à sua lista de ascensões.
  - [ ] **Usuário com Permissão Elevada**: Pode criar novos boulders e editar apenas aqueles que ele próprio adicionou.
  - [ ] **Usuário de Última Instância**: Pode editar e excluir boulders adicionados por outros usuários.

### 6. Visualização de Boulders

- [] **Listas de Boulders**: A visualização de boulders será feita através de listas resultantes dos filtros aplicados.
  - [ ] **Filtros Disponíveis**:
    - [x] **Localidade**: Filtra boulders por local específico (cidade, setor, etc.).
    - [ ] **Dificuldade**: Filtra boulders por nível de dificuldade.
- [ ] As listas devem ser ordenáveis por critérios como popularidade, data de criação, e número de ascensões.

### 8. Notificações

- [ ] Alertas sobre novas atividades, novos boulders, mudanças no ranking

### 9. Integração com Redes Sociais

- [ ] Compartilhamento de conquistas, como boulders completados e posições no ranking, diretamente nas redes sociais.

## 3. Requisitos Não Funcionais

### 1. Desempenho

- [ ] Suporte para grande volume de usuários simultâneos, com tempos de resposta rápidos para consultas e atualizações no ranking.

### 2. Escalabilidade

- [ ] Estrutura escalável para acomodar o crescimento de usuários e aumento no volume de dados, especialmente rankings.

### 3. Segurança

- [ ] Criptografia de dados sensíveis e medidas de segurança robustas para proteger as informações dos usuários e garantir a integridade dos rankings.

### 4. Usabilidade

- [ ] Interface intuitiva, otimizada para escaladores, tanto em desktop quanto em dispositivos móveis.

### 5. Disponibilidade

- [ ] Alta disponibilidade, garantindo acesso contínuo e confiável ao sistema.

### 6. Portabilidade

- [ ] Acesso via web e dispositivos móveis, com interface responsiva e suporte para diferentes sistemas operacionais.

## 4. Considerações Finais

A adição do ranking de boulders e vias mais escalados proporciona uma visão mais completa das tendências e preferências dentro da comunidade de escalada. Isso complementa o ranking de escaladores, oferecendo uma ferramenta adicional para os usuários explorarem e se inspirarem nas conquistas de outros escaladores.
