const http = require('http');
const url = require('url');
const fs = require('fs');
const locations = require('./data/location-data.js');
const menItems = require('./data/men.js');
const womenItems = require('./data/women.js');
const kidsItems = require('./data/kids');

let contentLoadOnExternal = false;

const converFirstLetterCapital = (str) => {
  str = str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
  return str;
};

const routeLink = (str) => {
  return `
    <h3 style="display: inline-block">
      <a href="/${str.toLowerCase()}" style="text-decoration:none">
        ${converFirstLetterCapital(str)}
      </a>
    </h3>
    &nbsp;`;
};

const pageHeader = (country, flag) => {
  return `
    <h1>Welcome to the Urban-Collection - ${converFirstLetterCapital(country)} ${flag}</h1>
    <h2>Choose catogarie where that you need to find your dream items</h2>
    `;
};

const getCatogeryItems = (catogery) => {
  let listOfItems = '';
  if (catogery === 'men') {
    menItems.forEach((el) => {
      listOfItems += `
        <div>
          <h3>${el.itemName} - ${el.brand}</h3>
          <h4>Color : ${el.color}</h4>
          <h4>Material: ${el.material}</h4>
          <h4>Avalable sizes: ${el.size}</h4>
          <p>Return policy:<i>${el.policy}</i></p>      
          <hr>        
        </div>`;
    });
  }

  if (catogery === 'women') {
    womenItems.forEach((el) => {
      listOfItems += `
        <div>
          <h3>${el.itemName} - ${el.brand}</h3>
          <h4>Color : ${el.color}</h4>
          <h4>Material: ${el.material}</h4>
          <h4>Avalable sizes: ${el.size}</h4>
          <p>Return policy:<i>${el.policy}</i></p>      
          <hr>        
        </div> `;
    });
  }
  if (catogery === 'kids') {
    kidsItems.forEach((el) => {
      listOfItems += `
        <div>
          <h3>${el.itemName} - ${el.brand}</h3>
          <h4>Color : ${el.color}</h4>
          <h4>Material: ${el.material}</h4>
          <h4>Avalable sizes: ${el.size}</h4>
          <p>Return policy:<i>${el.policy}</i></p>      
          <hr>        
        </div> `;
    });
  }
  return listOfItems;
};

http
  .createServer((req, res) => {
    const fullPath = url.parse(req.url, true);
    const currentPath = fullPath.pathname;
    const query = fullPath.query;
    res.writeHead(200, 'Node server for learning concepts', {
      'content-type': 'text/html',
    });

    if (currentPath === '/') {
      res.write(`
        <h1>Welcome to Urban-Collection fasion</h1>
        <hr>
        <h3 style="max-width:800px">
          Welcome to our international warehouse network delivering quality products quickly and securely to customers worldwide.</br></br> 
          
          <i>Our strategically located warehouses ensure efficient distribution, faster delivery times, and a seamless purchasing experience, no matter where you are.</i>
        </h3>

        <h2>How find your dream product</h2>

        <ol>
          <strong>
            <li>Select your preferred warehouse location</li>
            <li>Choose a product category</li>
            <li>Browse available items</li>
          </strong>  
        </ol>

        <ul>
          <strong>
            <li>
              Start by selecting a <u>warehouse location</u> below to explore available categories and products
            </li>
          </strong>
        </ul>
        <hr>
        `);

      locations.forEach((location) => {
        res.write(routeLink(location.country));
      });
      return res.end();
    }

    locations.forEach((lr) => {
      let route_link = '/' + lr.country;

      if (currentPath === route_link) {
        res.write(pageHeader(lr.country, lr.flagUniCode));
        if (!query.catogery) {
          res.write(`<h3><a href="/"> &#x2B05; Back </a></h3>`);
        } else {
          res.write(`<h3><a href="/${lr.country}"> &#x2B05; Back </a></h3>`);
        }
        res.write(`<hr>`);

        if (route_link === '/sweden') {
          contentLoadOnExternal = true;
          res.write(`
          <main>
            <h3 style="max-width:800px">
              <i>
                Our strategically located warehouses ensure efficient distribution, faster delivery times, and a seamless purchasing experience, no matter where you are.
              </i>
            </h3>

            <h2>How find your dream items</h2>

            <ol>
              <strong>
                <li>Choose a product category</li>
                <li>Browse available items</li>
              </strong>
            </ol>

            <ul>
              <strong>
                <li>
                  Start by selecting a <i>product category</i> below to explore available products
                </li>
              </strong>
            </ul>
            <hr>
          </main>
          
          <div>
            <nav>
            <h4 style="display: inline-block">
              <a href="/${lr.country}?catogery=men">Men</a>
            </h4>&nbsp;
            <h4 style="display: inline-block">
              <a href="/${lr.country}?catogery=women">Women</a>
            </h4>&nbsp;
            <h4 style="display: inline-block">
              <a href="/${lr.country}?catogery=kids">Kids</a>
            </h4>&nbsp;
            <h4 style="display: inline-block">
              <a href="/${lr.country}?catogery=sports">Sports</a>
            </h4>&nbsp;
            <h4 style="display: inline-block">
              <a href="/${lr.country}?catogery=working">Working</a>
            </h4>&nbsp;  
            </nav>
            <hr>
            <p>This is the content of the ${lr.country} page.</p>
          </div>
          `);
          return;
        }
        if (route_link === '/denmark') {
          contentLoadOnExternal = true;
          res.write(`
          <main>
            <h3 style="max-width:800px">
              <i>Our strategically located warehouses ensure efficient distribution, faster delivery times, and a seamless purchasing experience, no matter where you are.</i>
            </h3>

            <h2>How find your dream items</h2>

            <ol>
              <strong>
                <li>Choose a product category</li>
                <li>Browse available items</li>
              </strong>
            </ol>

            <ul>
              <strong>
                <li>
                  Start by selecting a <i>product category</i> below to explore available products
                </li>
              </strong>
            </ul>
            <hr>
          </main>
          <div>
            <nav>
            <h4 style="display: inline-block">
              <a href="/${lr.country}?catogery=men">Men</a>
            </h4>&nbsp;
            <h4 style="display: inline-block">
              <a href="/${lr.country}?catogery=women">Women</a>
            </h4>&nbsp;
            <h4 style="display: inline-block">
              <a href="/${lr.country}?catogery=kids">Kids</a>
            </h4>&nbsp;
            <h4 style="display: inline-block">
              <a href="/${lr.country}?catogery=sports">Sports</a>
            </h4>&nbsp;
            <h4 style="display: inline-block">
              <a href="/${lr.country}?catogery=working">Working</a>
            </h4>&nbsp;  
            </nav>
            <hr>
            <p>This is the content of the ${lr.country} page.</p>
          </div>
          `);
          return;
        }

        fs.readFile(`./content/${lr.country}-content.html`, (err, data) => {
          if (err) {
            res.write('There is something wrong with the data file');
            contentLoadOnExternal = true;
            return;
          } else {
            res.write(data);
            if (query.catogery) {
              res.write(getCatogeryItems(query.catogery));
              res.end();
            }
          }
          return;
        });
      }
      return;
    });

    if (query.catogery && contentLoadOnExternal) {
      res.write(getCatogeryItems(query.catogery));
      res.end();
    }
    contentLoadOnExternal = false;
    return;
  })
  .listen(8080, () => console.log('The server is runing on port 8080'));
