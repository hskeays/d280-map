document.querySelectorAll<HTMLElement>(".svgPath").forEach(worldMap => {
    worldMap.addEventListener("mouseover", () => {
      worldMap.style.fill = "rgb(162,207,99)";
    });
  
    worldMap.addEventListener("mouseleave", () => {
      worldMap.style.fill = "black";
    });
  
    worldMap.addEventListener("click", () => {
      async function getData() {
        const url = `https://api.worldbank.org/V2/country/${worldMap.id}?format=json`;
        const response = await fetch(url);
        const data = await response.json();
  
        const dataPath = data[1];
        const countryName = dataPath[0].name;
        const countryCapital = dataPath[0].capitalCity;
        const countryRegion = dataPath[0].region.value;
        const countryIncome = dataPath[0].incomeLevel.value;
        const countryLong = dataPath[0].longitude;
        const countryLat = dataPath[0].latitude;
  
        const nameElement = document.getElementById("namep") as HTMLElement;
        const capitalElement = document.getElementById("cap") as HTMLElement;
        const regionElement = document.getElementById("reg") as HTMLElement;
        const incomeElement = document.getElementById("income") as HTMLElement;
        const longElement = document.getElementById("long") as HTMLElement;
        const latElement = document.getElementById("lat") as HTMLElement;
  
        if (nameElement) nameElement.innerText = countryName;
        if (capitalElement) capitalElement.innerText = countryCapital;
        if (regionElement) regionElement.innerText = countryRegion;
        if (incomeElement) incomeElement.innerText = countryIncome;
        if (longElement) longElement.innerText = countryLong;
        if (latElement) latElement.innerText = countryLat;
      }
  
      getData().catch(console.error);
    });
  });
  