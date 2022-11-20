import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Tabs} from 'antd'
import CovidTable from "../components/CovidTable";
import CovidGraph from "../components/CovidGraph";

export default function Home() {
  const items = [
    { label: 'Table', key: 'table', children: <CovidTable /> },
    { label: 'Graph', key: 'graph', children: <CovidGraph /> },
  ]

  return (
    <div className={styles.container}>
      <Head>
        <title>CyHealth</title>
        <meta name="description" content="CyHealth" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          CyHealth
        </h1>

        <p className={styles.description}>
         Covid 19 Statistics and History.
        </p>


        <Tabs items={items} centered />

      </main>

      <footer className={styles.footer}>
        <small>Powered by ogechik</small>
      </footer>
    </div>
  )
}
