import React, { useMemo } from 'react';

import { Container, Content, Filters } from './styles'

import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import { IconBaseProps } from 'react-icons/lib';

interface IRouteParams {
  match: {
    params: {
      type: string;
    }
  }
}

const List: React.FC<IRouteParams> = ({ match }) => {

  const { type } = match.params

  const title = useMemo(() => {
    return type === 'entry-balance' ?
      {
        title: 'Entradas',
        lineColor: '#f7931b',
      } :
      {
        title: 'Saídas',
        lineColor: '#e44c4e',

      }
  }, [type])


  const months = [
    { value: '12', label: 'Dezembro' },
    { value: '1', label: 'Janeiro' },
    { value: '2', label: 'Feverreiro' }
  ]

  const years = [
    { value: '2021', label: '2021' },
    { value: '2020', label: '2020' },
    { value: '2019', label: '2019' }]

  return (
    <Container>
      <ContentHeader title={title.title} lineColor={title.lineColor}>
        <SelectInput options={months} />
        <SelectInput options={years} />

      </ContentHeader>

      <Filters>
        <button
          type="button"
          className="tag-filter tag-filter-recurrent"
        >
          Recorentes
        </button>

        <button
          type="button"
          className="tag-filter tag-filter-eventual"
        >
          Eventuais
        </button>
      </Filters>

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