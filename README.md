# Bike application Helsinki

An excercise of Solita Dev Academic 2022.

## Installation

Run project in local

#### Clone repository

```bash
git clone https://github.com/fishdev20/bike-application.git
```

#### Backend
 *Note: 
 - .env file will be attached to the application email, Please download and paste it into /backend/ folder.
 - Please also paste the journeys file as well as station.csv in the project folder.(this is not nessesary!)

```bash
  cd backend
  npm install
  npm run server
```

#### Frontend

```bash
  cd frontend
  npm install
  npm start
```



## API Reference

#### Get all stations

```http
  GET /api/stations
```



#### Get single station details

```http
  GET /api/stations/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of station to fetch |


#### Get all journeys

```http
  GET /api/allJourneys
```

#### Get journeys(pagination)

```http
  GET /api/journeys/?page&size
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `page`      | `number` | page |
| `size`      | `number` | rows per page |

#### Get single journey details

```http
  GET /api/journeys/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of journey to fetch |

#### Add new journey
```http
  POST /api/addJourneys
```



## Tech Stack

- **Client:** React, Reactn, Antd, Axios, Gsap

- **Server:** Node, Express, Mongodb



## Documentation

- [Ant Design](https://ant.design/)

- [Greensock](https://greensock.com/gsap/)

- [Axios](https://www.npmjs.com/package/axios)

- [react-router-dom](https://reactrouter.com/docs/en/v6/getting-started/tutorial)

- [reactn](https://www.npmjs.com/package/reactn)

- [leaflet](https://react-leaflet.js.org/)




## Screenshots

https://user-images.githubusercontent.com/85005930/184089648-2d742ae7-7e20-46b5-a399-1548e76c8d96.mp4
![image](https://user-images.githubusercontent.com/85005930/181729933-c141058e-acb2-4c4b-8a41-4d5dd15b30ab.png)
![image](https://user-images.githubusercontent.com/85005930/184534321-2adad1e5-b824-4e70-82dc-cc9b0979cef7.png)
![image](https://user-images.githubusercontent.com/85005930/181730232-2dccf43e-f0d0-477d-b6d6-a897e20d8982.png)
![image](https://user-images.githubusercontent.com/85005930/181732082-ec07f115-1be8-4eda-b617-ebc883dd4633.png)



## Authors

- [@minhnguyen](https://github.com/fishdev20)


