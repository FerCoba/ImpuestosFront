FROM registro.kolektor.com.ar:5000/jenkins_nginx
ADD target/impuestosfront.zip /tmp/
RUN mkdir -p /srv/www/ImpuestosFront
COPY PIPELINE/DS/default "/etc/nginx/sites-enabled/default"
RUN apt-get update && apt-get install unzip
RUN cd /tmp ; unzip impuestosfront.zip -d /srv/www/ImpuestosFront
