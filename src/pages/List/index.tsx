import React, { useMemo, useState, useEffect } from 'react';

import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import { IconBaseProps } from 'react-icons/lib';

import { Container, Content, Filters } from './styles'

import expenses from '../../repositories/expenses'
import gains from '../../repositories/gains'

import formatCurrency from '../../utils/formatCurrency'
import formatDate from '../../utils/formatDate'

interface IRouteParams {
  match: {
    params: {
      type: string;
    }
  }
}

interface IData {
  id: number;
  description: string;
  amountFormated: string;
  frequency: string;
  dateFormatted: string;
  tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {
  const [data, setData] = useState<IData[]>([]);

  const { type } = match.params

  const typeRender = useMemo(() => {
    return type === 'entry-balance' ?
      {
        title: 'Entradas',
        lineColor: '#f7931b',
        listData: gains
      } :
      {
        title: 'Saídas',
        lineColor: '#e44c4e',
        listData: expenses
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

  useEffect(() => {

    const response = typeRender.listData.map(item => {
      return {
        id: item.id,
        description: item.description,
        amountFormated: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dateFormatted: formatDate(item.date),
        tagColor: item.frequency === 'recorrente' ? '#4E41F0' : "#e44c4e"
      }
    })

    setData(response);
  }, []);

  return (
    <Container>
      <ContentHeader title={typeRender.title} lineColor={typeRender.lineColor}>
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

        {
          data.map(item => (
            <HistoryFinanceCard
              key={item.id}
              tagColor={item.tagColor}
              title={item.description}
              subtitle={item.dateFormatted}
              amount={item.amountFormated}
            />
          ))
        }

      </Content>
    </Container>
  )
}

export default List;