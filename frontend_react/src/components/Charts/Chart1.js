import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { popular_sites } from "../../utils/constants";
import { fetchFromServer } from "../../utils/fetchFromServer";

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
      position: "top",
    },
    // title: {
    //   display: true,
    //   text: 'Chart.js Bar Chart',
    // },
  },
};

const getSites = () => {
  let temp = [];
  popular_sites.map((site) => temp.push(site?.name));

  return temp;
};

const labels = getSites();

const countAllScrapes = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    try {
      const uid = user.user_id;
      const temp_datas = [];

      for (let index = 0; index < popular_sites.length; index++) {
        const website = popular_sites[index]?.name;
        const res = await fetchFromServer("scrapes-count-by-site", {
          website,
          uid,
        });
        const result = await res?.data;
        temp_datas.push(result);
      }

      return temp_datas;
    } catch (error) {
      console.error("Error", error);
      throw error; // Rethrow the error to handle it elsewhere if needed.
    }
  }
};

async function fetchData() {
  try {
    const getCountDatas = await countAllScrapes();
    return getCountDatas;
  } catch (error) {
    console.error("Error de récupération de données", error);
  }
}

const websitesAllScrapes = await fetchData();
const sites = [];
for (let i = 0; i <= popular_sites.length; i++) {
  sites.push(popular_sites[i]?.name);
}

const Chart1 = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Bar
      options={options}
      data={{
        labels,
        datasets: [
          {
            label: "Extractions effectuées",
            // data: labels.map((key) => (user ? websitesAllScrapes[sites.indexOf(key)] : faker.number.int({ min: 0, max: 1000 }))),
            data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
          {
            label: "Extractions réussies",
            // data: labels.map((index) => (user ? websitesAllScrapes[popular_sites.indexOf(index)] : faker.number.int({ min: 0, max: 1000 }))),
            data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      }}
    />
  );
};

export default Chart1;
