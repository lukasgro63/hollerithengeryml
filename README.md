# HollerithEngeryML

**Empower Your AI-Training with Green Efficiency!**

*With just a few clicks, you can estimate the energy consumption of your machine learning model training process. Simply input the size of your dataset, the number of numerical and categorical features, and watch as we calculate the energy footprint.*



## Table of Contents

- [HollerithEngeryML](#hollerithengeryml)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [How to use](#how-to-use)
  - [Demo](#demo)



## Overview
![Docker Compose](https://img.shields.io/badge/Docker%20Compose-vX-2496ED.svg?logo=docker)
![FastAPI](https://img.shields.io/badge/FastAPI-v0.105.0-009688.svg?logo=fastapi)
![Angular](https://img.shields.io/badge/Angular-vX-DD0031.svg?logo=angular)
![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-v1.2.2-F7931E.svg?logo=scikit-learn)
![NumPy](https://img.shields.io/badge/NumPy-v1.23.5-013243.svg?logo=numpy)
![Python](https://img.shields.io/badge/Python-3.8%2B-3776AB.svg?logo=python)
![Anaconda](https://img.shields.io/badge/Anaconda--44A833.svg?logo=anaconda)
![VS Code](https://img.shields.io/badge/Visual%20Studio%20Code--007ACC.svg?logo=visual-studio-code)
![Git](https://img.shields.io/badge/Git--F05032.svg?logo=git)
![Jupyter](https://img.shields.io/badge/Jupyter--F37626.svg?logo=jupyter)
![Google Colab](https://img.shields.io/badge/Google%20Colab--F9AB00.svg?logo=google-colab)
![AWS](https://img.shields.io/badge/AWS--232F3E.svg?logo=amazon-aws)


The calculation goes as follows:

`1. Input Features & Dataset Sizse`➙`2. Load RandomForrest Model`➙`3. Predict the Energy Consumtion`➙`4. Show Bar Chart with predicted Energy Consumtion`

**Here should be an Image of the Architecture**


## How to use

**1. Installations**
   
Have <a href="https://docs.docker.com/get-docker/" target="_blank">Docker</a> and <a href="https://nodejs.org/en/download" target="_blank">Node.js</a> installed and running:

- Make sure `docker-compose` is installed:
```bash
pip install docker-compose
```

- Make sure `node.js` is installed:
```bash
sudo apt-get install nodejs npm
```

**2. Clone the Repository**

create a `.env` file in the project root and configure the necessary environment variables. You can use the `.env.example` file as a template:
```bash
git clone https://gitlab.reutlingen-university.de/schulza/ml_recommender_system.git

cd <repository-directory>
```

**3. Start your Containers**
- Build your own images locally by running the `docker-compose.yml` file:
```bash
docker-compose up --build -d
```
- Alternativly get the images from the GitLab Container Registry (Recommended):
```bash
docker login gitlab.reutlingen-university.de:5050

# Backend Image
docker pull gitlab.reutlingen-university.de:5050/schulza ml_recommender_system-backend-base-image:latest
# Frontend Image
docker pull gitlab.reutlingen-university.de:5050/schulza ml_recommender_system-frontend-base-image:latest

# Start Container
docker-compose up
```


## Demo

<video width="640" height="360" controls>
  <source src="Docu/video/demo-video.mp4" type="video/mp4">
  Ihr Browser unterstützt das Video-Tag nicht.
</video>
