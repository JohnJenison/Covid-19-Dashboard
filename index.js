const totalCases = document.getElementById('totalCases');
const totalDeaths = document.getElementById('totalDeaths');
const totalVacinated = document.getElementById('totalVacinated');
const totalPartialVacinated = document.getElementById('totalPartialVacinated');

async function showData() {
  // const response_cases = await fetch('https://covid-api.mmediagroup.fr/v1/cases?country=India');
  // const response_vaccines = await fetch('https://covid-api.mmediagroup.fr/v1/vaccines?country=India');
  // const data_cases = await response_cases.json();
  // const data_vaccines = await response_vaccines.json();
  let response = await getDataByCountry('India');
  render(response);
  setInterval(async function(){
      response = await getDataByCountry('India');
      render(response);
  }, 60000);
}
async function render(data){
  const stat = await data.latest_stat_by_country[0];
  totalCases.innerHTML = stat.active_cases;
  totalDeaths.innerHTML = stat.total_deaths;
}
function getDataByCountry(keyword){
  const options = {
      "headers": {
          "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
          "x-rapidapi-key": "beefe7b6eamsh027aa7179884c8ap135e99jsnfc04f913872c"
      }  
  }
  const url = `https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country=${keyword}`;
  return fetch(url, options).then(res => res.json()).then(data => Promise.resolve(data)).catch(err => Promise.reject(err));
}

showData();