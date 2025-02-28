# Roman Numeral Converter

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Running the Application](#running-the-application)
6. [API Endpoints](#api-endpoints)
7. [Observability](#observability)
8. [Docker Support](#docker-support)

---

## Introduction
This project is a full-stack **Roman Numeral Converter** built using **React with React Spectrum** for the frontend and **Node.js with Express** for the backend. It converts numbers (1-3999) into Roman numerals and includes logging, metrics, and observability features.

## Features
- **React Spectrum UI** (Supports light & dark mode based on system settings)
- **Node.js API on Port 8080**
- **Roman numeral conversion for numbers between 1 and 3999**
- **Full observability (logs, metrics, and traces)**
- **Dockerized for easy deployment**

## Technologies Used
- **Frontend**: React, TypeScript, React Spectrum
- **Backend**: Node.js, Express.js, Winston (logging)
- **Observability**: Winston (logs)
- **Deployment**: Docker

## Installation
### Prerequisites
1. Install **Node.js 18**:
   - Download from [Node.js Official Site](https://nodejs.org/)
   - Or install via terminal:
     ```sh
     # For Linux/macOS
     nvm install 18
     nvm use 18
     
     # For Windows (Using Chocolatey)
     choco install nodejs-lts
     ```
2. Verify installation:
   ```sh
   node -v
   npm -v
   ```

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/roman-numeral-converter.git
   cd roman-numeral-converter
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Running the Application
To start both the frontend and backend:
```sh
npm start
```
- **React UI**: `http://localhost:3000`
- **API**: `http://localhost:8080/romannumeral?query={integer}`

## API Endpoints
### Convert Number to Roman Numeral
```
GET /romannumeral?query={integer}
```
- **Request Example:** `http://localhost:8080/romannumeral?query=10`
- **Response:**
```json
{
   "input": "10",
   "output": "X"
}
```

## Observability
- **Logs**: All API requests and responses are logged using `winston`.
- **Performance Metrics**: Logs include response time for each API request.
- **Error Handling**: Invalid inputs return `400 Bad Request` with a plain text error message.

## Docker Support
To build and run with Docker:
#### 1. Go to the root folder
#### 2. Run below commands to build and run the docker image 
```sh
docker build -t roman-numeral-app .
docker run -p 8080:8080 -p 3000:3000 roman-numeral-app
```
#### 3. Dockerfile contents
```sh
# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all files
COPY . .

# Expose ports
EXPOSE 8080
EXPOSE 3000

# Start API and UI
CMD ["npm", "start"]

```
