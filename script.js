async function loginIsolar() {
  const res = await fetch('https://gateway.isolarcloud.com.hk/openapi/v1/auth/login', {
    method: 'POST', headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ userName: 'adrianolatte@gmail.com', password: 'Herpes2013!', loginType:'1' })
  });
  const j = await res.json();
  return j.data.token;
}
async function loginAurora() {
  const res = await fetch('https://api.auroravision.net/api/v1/auth/login', {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ username: 'adrianolatte@gmail.com', password: 'Herpes2013!' })
  });
  const j = await res.json();
  return j.data.token;
}
async function fetchData() {
  try {
    const t1 = await loginIsolar();
    const r1 = await fetch('https://gateway.isolarcloud.com.hk/openapi/v1/common/getStationPower?stationCode=IL_TUO_ID', { headers:{ token:t1 } });
    const d1 = await r1.json();
    document.getElementById('anfore-power').textContent = d1.data.power;
    document.getElementById('anfore-energy').textContent = d1.data.energy;
    document.getElementById('anfore-status').textContent = 'OK';

    const t2 = await loginAurora();
    const r2 = await fetch('https://api.auroravision.net/api/v1/sites/TUO_SITE_ID/overview', { headers:{ 'Authorization':'Bearer '+t2 } });
    const d2 = await r2.json();
    document.getElementById('domus-power').textContent = d2.power;
    document.getElementById('domus-energy').textContent = d2.energy;
    document.getElementById('domus-status').textContent = 'OK';

    // ACS simulati (da integrare API Egea/EWPE)
    document.getElementById('anfore-temp').textContent = '45';
    document.getElementById('anfore-acs-status').textContent = 'OK';
    document.getElementById('domus-temp').textContent = '42';
    document.getElementById('domus-acs-status').textContent = 'OK';

  } catch(err) {
    console.error(err);
    document.getElementById('anfore-status').textContent = 'Errore';
    document.getElementById('domus-status').textContent = 'Errore';
  }
}

document.getElementById('refresh').addEventListener('click', fetchData);
window.addEventListener('load', fetchData);
