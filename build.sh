#!/bin/bash
#buildea la imagen para generar el dist
ENV=Jenkins

if [[ -z "$1" ]]; then
	   ENV="local"
   fi

docker build -f Dockerfile.build -t frontimpuestos-build:latest .

#remueve el container anterior para que no tire error el proximo paso
docker rm frontimpuestos-build || true

#crea un contenedor con la imagen que acaba de crear
docker create --name frontimpuestos-build frontimpuestos-build:latest

#startea el contenedor creado
docker start frontimpuestos-build

#borra el dist actual si existiese
rm -rf dist/

#copia desde el container al host la carpeta dist
docker cp frontimpuestos-build:/workspace/dist/ .
mkdir -p target
echo ----------------------------
pwd

cd dist/Impuestos
zip -r impuestosfront.zip .

echo ----------------------------
pwd
mv impuestosfront.zip ../../target/
#freno la ejecucion del container
docker stop frontimpuestos-build

#elimino el container
docker rm frontimpuestos-build || true

#elimino la imagen ya que sirve solo por una corrida sino se llena el disco
docker rmi frontimpuestos-build

#if [ $ENV == "local" ];
#then
#       	cd ../../
# docker build -t impuestosFront .
#  echo "running container in port 9090 ...."
 #docker run -p9090:80 impuestosFront -v /dist/FrontImpuestos:/srv/www/impuestosFront
#fi

if [ $ENV == "local" ];
then
       	cd ../../
 docker build -t impuestosfront .
  echo "running container in port 9090 ...."
#  docker run -d -p9090:80 impuestosfront
fi
