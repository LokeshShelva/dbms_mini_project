# School Manegement System

## Setup for development
- Install Docker 
    Link for the installation guide: [Link](https://do8cs.docker.com/desktop/windows/install/)

- Once docker is running go to the directory with the *docker-compose.yml* file.

- Create a *.env* file similar to the *.env.sample* and add the required auth details.

- Run the following command
```
docker-compose up
```

- This will install the required packages for startup MySQL and PhpMyAdmin at port **8081**.[^1]


[^1]: You can change the port for the PhpMyAdmin by changing the value in the *docker-compose.yml* file