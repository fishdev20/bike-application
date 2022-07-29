# Bike application Helsinki

An excercise of Solita Dev Academic 2022



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
  GET /api/journeys
```

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

**Client:** React, Reactn, Antd, Axios, Gsap

**Server:** Node, Express, Mongodb



## Documentation

[Ant Design](https://ant.design/)

[Greensock](https://greensock.com/gsap/)

[Axios](https://www.npmjs.com/package/axios)

[react-router-dom](https://reactrouter.com/docs/en/v6/getting-started/tutorial)

[reactn](https://www.npmjs.com/package/reactn)

[leaflet](https://react-leaflet.js.org/)


## Run on local

To run client 

```bash
  npm run frontend
```

To run server 

```bash
  npm run server
```


## Screenshots


## Authors

- [@minhnguyen](https://github.com/fishdev20)


