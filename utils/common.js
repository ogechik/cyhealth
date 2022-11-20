export function formatDate(date) {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

export function getTime(isodate) {
  const dateObj = new Date(isodate)
  let hour = dateObj.getHours()
  let minute = dateObj.getMinutes()

  if (hour < 10)
    hour = '0' + hour
  if (minute < 10)
    minute = '0' + minute

  return `${hour}:${minute}`
}

export function filterCases(data){
  return data.map(record => record.cases.active)
}

export function filterDeaths(data){
  return data.map(record => record.deaths.total)
}

export function filterTests(data){
  return data.map(record => record.tests.total || 0)
}

export function generateLabels(data){
  return data.map(record => getTime(record.time))
}
