import {message, Table} from "antd";
import {useEffect, useState} from "react";

const CovidTable = () => {
  const [statistics, setStatistics] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=> {
    const getStatistics = async ()=>{
      setLoading(true)
      const res = await fetch('https://covid-193.p.rapidapi.com/statistics/',{
        headers: {
          "X-RapidAPI-Key" : process.env.apiKey
        }
      })

      if(res.status === 200){
        setLoading(false)
        const data = await res.json()
        setStatistics(data.response)
      }else{
        setLoading(false)
        message.error('something went wrong')
      }
    }

    getStatistics()
  }, [])

  const columns = [
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      render: (country) => country,
      filters: statistics.map(stat => {
        return {text: stat.country, value: stat.country}
      }),
      onFilter: (value, record) => record.country.startsWith(value),
      filterSearch: true,
    },
    {
      title: 'Cases',
      children: [
        {
          title: 'New',
          dataIndex: 'cases',
          key: 'new',
          render: (cases) => cases.new === null ? '-' : cases.new
        },
        {
          title: 'Active',
          dataIndex: 'cases',
          key: 'active',
          render: (cases) => cases.active
        },
        {
          title: 'Critical',
          dataIndex: 'cases',
          key: 'critical',
          render: (cases) => cases.critical
        },
        {
          title: 'Recovered',
          dataIndex: 'cases',
          key: 'recovered',
          render: (cases) => cases.recovered
        },
      ]
    },
    {
      title: 'Deaths',
      children: [
        {
          title: 'Last 24hrs',
          dataIndex: 'deaths',
          key: 'deaths',
          render: (deaths) => deaths.new === null ? '-':deaths.new
        },
        {
          title: 'Total',
          dataIndex: 'deaths',
          key: 'deaths',
          render: (deaths) => deaths.total
        }],
    },
    {
      title: 'Population',
      dataIndex: 'population',
      key: 'population',
      render: (population) => population ? population:'-'
    },
  ]

  return <Table
    dataSource={statistics}
    columns={columns}
    loading={loading}
    bordered
    scroll={{scrollToFirstRowOnChange: true}}
  />
}


export default CovidTable
