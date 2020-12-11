import React from 'react';

import { Container, Content } from './styles'

import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

const List: React.FC = () => {

  const options = [
    { value: 'Elivelton', label: 'Rodrigo' },
    { value: 'Maria', label: 'Maria' },
    { value: 'Ana', label: 'Ana' }
  ]

  return (
    <Container>
      <ContentHeader title="Saídas" lineColor="#e44c4e">
        <SelectInput options={options} />

      </ContentHeader>

      <Content>
        <HistoryFinanceCard
          tagColor="#e44c4e"
          title="Conta de Luz"
          subtitle="27/07/2020"
          amount="R$ 130,00"
        />


      </Content>
    </Container>
  )
}

export default List;