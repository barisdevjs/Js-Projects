fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("container");

    console.log(data);
    data.Space.forEach(spaceItem => {
      const groupDiv = document.createElement("div");
      const groupH2 = document.createElement("h2");
      groupH2.innerHTML = `${spaceItem.Header}`;
      groupDiv.appendChild(groupH2);
      const gridDiv = document.createElement("div");
      gridDiv.className=`grid${spaceItem.Order}`
      
      spaceItem.Tiles.forEach(tile => {
        const tileDiv = document.createElement("div");
        tileDiv.className = "tile";
        tileDiv.style.width =  tile.Width - 8  +"px";
        tileDiv.style.height = tile.Height - 8+ "px";
        tileDiv.style.border = "1px solid red";
        tileDiv.style.gridArea = String.fromCharCode(64 + tile.Order)
        tileDiv.innerHTML = `${tile.Name}`;
        const centerTitle =  document.createElement("p");
        centerTitle.innerHTML =` ${tile.Width} x ${tile.Height}`
        tileDiv.appendChild(centerTitle);
        gridDiv.appendChild(tileDiv);
      });
      
      groupDiv.appendChild(gridDiv)

      container.appendChild(groupDiv);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
