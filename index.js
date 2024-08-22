import express from 'express'
import axios from 'axios';


const myServer = express();
const portUsed = 3000;


myServer.use(express.static('public'));
myServer.use(express.urlencoded({ extended: true }));

myServer.get('/', (req, res) => {
    res.render('index.ejs');
});

myServer.post('/weather', async (req, res) => {
    const city = req.body.city;
    const apiKey = 'f7f9ddf095498023e9db31c2bfb3c410';
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        const weatherData = response.data;
        res.render('weather.ejs', { weather: weatherData, city: city });
    } catch (error) {
        res.render('weather.ejs', { weather: null, city: city, error: 'Error, please try again' });
    }
});

myServer.listen(portUsed, () => {
    console.log(`Server is currently running on ${portUsed}`);
});

