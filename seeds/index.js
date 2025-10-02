const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10; // Random price between 10 and 30
        const camp = new Campground({
            author: '68c298503b148c4b459c9495',
            location: `${cities[random1000].city}, ${cities[random1000].state}`, 
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: `https://picsum.photos/400?random=${Math.random()}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            price: price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dot4wjxmc/image/upload/v1759165158/YelpCamp/vhhzcryjzxnjjbquzfca.jpg',             
                    filename: 'YelpCamp/vhhzcryjzxnjjbquzfca'
                },
                {
                    url: 'https://res.cloudinary.com/dot4wjxmc/image/upload/v1759165157/YelpCamp/guorogcn9blegaqvgace.png',             
                    filename: 'YelpCamp/guorogcn9blegaqvgace'
                }
            ]

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})


 

