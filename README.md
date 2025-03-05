# Api Gateway Template

This project is part of [NestJS Microservices Template](https://github.com/dasantosa/nestjs-msvc-project-base-project).

## Description

This repository serves as a base project for building a microservices architecture using the NestJS framework. It includes the following core components:

- **API Gateway**: Centralized entry point for handling client requests.
- **Authentication Microservice**: Manages user authentication and authorization.
- **Other Microservice**: A template microservice that can be cloned and customized as needed.

### Project Repositories:

- [Base Project](https://github.com/dasantosa/nestjs-msvc-project-base-project)
- [API Gateway](https://github.com/dasantosa/nestjs-msvc-project-api-gateway)
- [Authentication Microservice](https://github.com/dasantosa/nestjs-msvc-project-auth-msvc)
- [Other Microservice](https://github.com/dasantosa/nestjs-msvc-project-other-msvc)

## Installation

Follow these steps to install and set up the project:

### API Gateway

```bash
$ git clone https://github.com/dasantosa/nestjs-msvc-project-api-gateway
$ cd nestjs-msvc-project-api-gateway
$ npm install
```

### Authentication Service

```bash
$ git clone https://github.com/dasantosa/nestjs-msvc-project-auth-msvc
$ cd nestjs-msvc-project-auth-msvc
$ npm install
```

### Other Microservice

```bash
$ git clone https://github.com/dasantosa/nestjs-msvc-project-other-msvc
$ cd nestjs-msvc-project-other-msvc
$ npm install
```

## Security Features

The project includes several security mechanisms to enhance protection:

1. **CORS (Cross-Origin Resource Sharing)**: Controlled access to resources from different origins.
2. **Data Validation**: Ensures only allowed fields are accepted, with automatic type transformation.
3. **Global Exception Handling**: Uses `AllExceptionsFilter` to manage and log unhandled exceptions, preventing exposure of sensitive error details.
4. **Request Body Size Limit**: Limits request body size to 1KB to mitigate oversized payload attacks.
5. **HTTP Security Headers**: Provides protection against XSS, clickjacking, MIME sniffing, etc.
6. **Rate Limiting**: Protects against brute force and DDoS attacks by limiting requests per time frame.
7. **JWT-Based Authentication**: Secure authentication mechanism using JSON Web Tokens.
8. **Environment Configuration Management**: Ensures secure handling of sensitive environment variables.
9. **CSRF Protection (To Be Implemented)**.

## Running the API Gateway

There are two ways to run the project:

### Running Locally

Clone each repository and execute the `run.sh` script:

```bash
$ ./run.sh
```

### Running with Docker

Clone each repository and execute the `deploy_latest.sh` script:

```bash
$ ./deploy_latest.sh
```

## TODO List

- [ ] Implement **CSRF Protection** for enhanced security.
- [ ] Add **Monitoring** using a centralized system.
- [ ] Implement **Service Discovery** using tools like or **Eureka**.
- [ ] Introduce **Circuit Breaker Patterns** with **Resilience4J** or NestJS interceptors.
- [ ] Improve **Rate Limiting** with dynamic configurations.
- [ ] Set up **Automated Testing** (unit & integration tests).
- [ ] Add support for **Database Authentication** using **SQL** or **NoSQL**.
- [ ] Implement **Role-Based Access Control (RBAC)** for better authorization management.
- [ ] Introduce **Kafka/RabbitMQ** for event-driven communication.

## Stay Connected

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-000000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/dasantosa/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/daniel-santos-anes/)

</div>
