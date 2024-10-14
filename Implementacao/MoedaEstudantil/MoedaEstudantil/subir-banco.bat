@echo off
docker run -p 3308:3306 --name db_moeda -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=moeda_estudantil -d mysql:8.0 --default-authentication-plugin=mysql_native_password 
