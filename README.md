# Spenza Webhook Assignment

This NestJS Application performs the role of subscribing to client webhooks and listening for webhook events from different sources. This application is the basic implementation of it and can be modified in several different ways to make it more modular, secure and scalable.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in the root directory. Refer to the .env.example in the root of the project

`JWT_SECRET`
`MONGODB_URI`

## Installation and Local Setup

After setting up the .env file by referencing the `.env.example` file use the following set of commands to setup the project:

```bash
$ yarn install
```

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## API Reference

#### Login Route

```http
  POST /auth/login
```

Register new user

| Parameter  | Type     | Description |
| :--------- | :------- | :---------- |
| `username` | `string` |             |
| `password` | `string` |             |

#### Signup Route

```http
  POST /auth/register
```

| Parameter  | Type     | Description |
| :--------- | :------- | :---------- |
| `username` | `string` |             |
| `password` | `string` |             |

#### Webhook Subscribe Route

```http
  POST /webhooks/subscribe
```

| Header          | Type                 | Description                 |
| :-------------- | :------------------- | :-------------------------- |
| `Authorization` | `Bearer <JWT_TOKEN>` | Get jwt from login endpoint |

| Parameter     | Type     | Description |
| :------------ | :------- | :---------- |
| `source`      | `string` |             |
| `callbackUrl` | `string` |             |

```http
  GET /webhooks
```

Get all webhooks subscribed for a particular user

| Header          | Type                 | Description                 |
| :-------------- | :------------------- | :-------------------------- |
| `Authorization` | `Bearer <JWT_TOKEN>` | Get jwt from login endpoint |

```http
  GET /webhooks/events
```

Get all webhook events for a particular user

| Header          | Type                 | Description                 |
| :-------------- | :------------------- | :-------------------------- |
| `Authorization` | `Bearer <JWT_TOKEN>` | Get jwt from login endpoint |

```http
  DELETE /webhooks/:id
```

Delete/Cancel subscribed webhook for the user using the ObjectId of that webhook and ll the assosciated webhook events will also be deleted.

| Header          | Type                 | Description                 |
| :-------------- | :------------------- | :-------------------------- |
| `Authorization` | `Bearer <JWT_TOKEN>` | Get jwt from login endpoint |

## Frontend

The ReactJS Repository for this project can be setup for using all the functionality via simple UI.

Repo Link: [Frontend Repo](https://github.com/goellavish10/spenza-webhook-frontend)

## 🚀 About Me

I am Lavish Goyal, recently graduated from NIT Jalandhar, developing web applications since 2020 and have > 20 months of experience building production grade software with fast-paced startups and off-shore clients.

I am looking out for next opportunity as a full time software developer.

Here are brief accomplishments at my ex organisations:

1. Developed a product from scratch, 0-100, achieving more than 50k visits per week, on peak days reaching a 25k requests per minute. I developed a real-time analytics dashboard and loyalty program for the product as well which has been working in sync perfectly. [here](https://bookings.atccouriers.com.au/v2/quotation/step-1)

2. Proposed, pitched, designed the architecture and developed the integration which led to a 25 lakh/month new revenue stream at my intern organisation.

3. Worked on a system design problem in the codebase where our servers were getting bottlenecked and ensured it to deliver out > 27 million email & SMS communication over a single weekend

Let's connect at:

[Email](mailto:goellavish10@gmail.com)

[Linkedin](https://linkedin.com/in/goellavish10)

Here's my resume: [Click](https://tinyurl.com/resumelavish)
