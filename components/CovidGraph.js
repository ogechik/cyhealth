import React, {useEffect, useState} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import {message} from "antd";
import {filterCases, filterDeaths, filterTests, formatDate, generateLabels} from '../utils/common'
import styles from '../styles/Graph.module.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)


const CovidGraph = () => {
  const [loading, setLoading] = useState(false)
  const  [cases, setCases] = useState([])
  const  [deaths, setDeaths] = useState([])
  const  [tests, setTests] = useState([])
  const [labels, setLabels] = useState([])

  useEffect(()=>{
    const getHistory = async ()=>{
      setLoading(true)
      const res = await fetch(`https://covid-193.p.rapidapi.com/history?country=all&day=${formatDate(new Date)}`,{
        headers: {
          "X-RapidAPI-Key" : process.env.apiKey
        }
      })

      if(res.status === 200){
        setLoading(false)
        const data = await res.json()
        setCases(filterCases(data.response))
        setDeaths(filterDeaths(data.response))
        setTests(filterTests(data.response))
        setLabels(generateLabels(data.response))
      }else{
        setLoading(false)
        message.error('something went wrong')
      }
    }

    getHistory()
  },[])

  const data = {
    labels,
    datasets: [
      {
        label: 'Cases',
        data: cases,
        borderColor: 'rgb(255, 193, 7)',
        backgroundColor: 'rgba(255, 193, 7, 0.5)',
      },
      {
        label: 'Deaths',
        data: deaths,
        borderColor: 'rgb(220, 53, 69)',
        backgroundColor: 'rgba(220, 53, 69, 0.5)',
      },
      {
        label: 'Tests',
        data: tests,
        borderColor: 'rgb(13, 110, 253)',
        backgroundColor: 'rgba(13, 110, 253, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Covid19 Analysis(History)',
      },
    },
  }

  return <div className={styles.graphContainer}>
    <Line options={options} data={data} />
  </div>
}

export default CovidGraph
