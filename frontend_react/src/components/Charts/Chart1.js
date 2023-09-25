import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { popular_sites } from '../../utils/constants';
import { fetchFromServer } from '../../utils/fetchFromServer';
import { useState } from 'react';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    // title: {
    //   display: true,
    //   text: 'Chart.js Bar Chart',
    // },
  },
};

const getSites = () => {
  let temp = [];
  popular_sites.map((site) => (
    temp.push(site?.name)
  ));

  return temp;
}

const labels = getSites();

export const data = {
  labels,
  datasets: [
    {
      label: 'Extractions effectuées',
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Extractions réussies',
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const Chart1 = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [countAll, setCountAll] = useState([]);

  function countAllScrapes() {
    try {
      const { email } = user[0];
      fetch(`${process.env.REACT_APP_BASE_API_URL}/get-user`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email }),
      })
      .then(async (response) => {
        if(!response.ok) throw new Error("Impossible d'accéder à la requête")
  
        const data = await response.json();
        const { uid } = data[0];
        try {
          const temp_datas = [];
          for (let index = 0; index < popular_sites.length; index++) {
            const website = popular_sites[index]?.name;
            fetchFromServer('scrapes-count-by-site', { website, uid })
            .then(async (res) => {
              const result = await res?.data[0].counter;
              temp_datas.push(result);
            })
          }
          setCountAll(temp_datas);
        } catch (error) {
          console.error("Erreur");
        }
      })
    } catch (error) {
      console.error("Error de récupération de données", error);
    }
  }

  return <Bar options={options} data={data} />;
}

export default Chart1;