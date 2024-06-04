import { Component, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.css']
})
export class WorldComponent implements AfterViewInit {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit() {
    const embedElement = this.el.nativeElement.querySelector('embed');
    embedElement.addEventListener('load', () => {
      const svgDoc = embedElement.getSVGDocument();
      const svgPaths = svgDoc.querySelectorAll('path');

      svgPaths.forEach((svgPath: { id: string; }) => {
        this.renderer.listen(svgPath, 'mouseover', () => {
          this.renderer.setStyle(svgPath, 'fill', 'rgb(180,198,123)');
          this.renderer.setStyle(svgPath, 'cursor', 'pointer');
        });

        this.renderer.listen(svgPath, 'mouseleave', () => {
          this.renderer.setStyle(svgPath, 'fill', 'black');
        });

        this.renderer.listen(svgPath, 'click', () => {
          this.getData(svgPath.id);
        });
      });
    });
  }

  async getData(countryId: string) {
    const url = `https://api.worldbank.org/V2/country/${countryId}?format=json`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      const dataPath = data[1][0];
      const countryName = dataPath.name;
      const countryCapital = dataPath.capitalCity;
      const countryRegion = dataPath.region.value;
      const countryIncome = dataPath.incomeLevel.value;
      const countryLong = dataPath.longitude;
      const countryLat = dataPath.latitude;

      const nameElement = document.getElementById("name") as HTMLElement;
      const capitalElement = document.getElementById("capitol") as HTMLElement;
      const regionElement = document.getElementById("region") as HTMLElement;
      const incomeElement = document.getElementById("income") as HTMLElement;
      const longElement = document.getElementById("longitude") as HTMLElement;
      const latElement = document.getElementById("latitude") as HTMLElement;

      if (nameElement) nameElement.innerText = countryName;
      if (capitalElement) capitalElement.innerText = countryCapital;
      if (regionElement) regionElement.innerText = countryRegion;
      if (incomeElement) incomeElement.innerText = countryIncome;
      if (longElement) longElement.innerText = countryLong;
      if (latElement) latElement.innerText = countryLat;

    } catch (error) {
      console.error('Error fetching country data:', error);
    }
  }
}
