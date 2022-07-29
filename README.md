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
![image](https://user-images.githubusercontent.com/85005930/181729933-c141058e-acb2-4c4b-8a41-4d5dd15b30ab.png)
![image](https://user-images.githubusercontent.com/85005930/181730183-d3f44324-d5c9-49ff-8479-1132906b8b5b.png)
![image](https://user-images.githubusercontent.com/85005930/181730232-2dccf43e-f0d0-477d-b6d6-a897e20d8982.png)


## Authors

- [@minhnguyen](https://github.com/fishdev20)


