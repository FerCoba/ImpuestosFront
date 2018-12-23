import { environment as defaultEnvironment } from '../../environments/environment';
import { isPrimitive } from 'util';

//esto se hace para que tome la configuracion de entorno correcta en tiempo de ejecucion
export const environmentLoader = new Promise<any>((resolve, reject) => {
  
  //obtiene el subdominio de la aplicacion
  //si obtiene localhost entonces devuelve un string vacio
  var getSubdomain = function() {
    let hostUrl = window.location.host;
    let parts = hostUrl.split(".");
    let subdomain = parts[0];

    let isLocalhost = subdomain.search('localhost') === 0 || 
                                      //expresion regular para buscar una direccion ip
                      hostUrl.search(/(\d*\.?){3}\d\:*\d*/) !== -1;

    let isProd = subdomain ==='www';

    subdomain = isLocalhost ? '' :
                isProd ? '.PROD' : 
                '.'.concat(subdomain);
    
    subdomain = subdomain.toUpperCase();

    return subdomain;
  }

  var xmlhttp = new XMLHttpRequest(),
    method = 'GET',
    url = './assets/environments/environment'.concat(getSubdomain()).concat('.json');

  xmlhttp.open(method, url, true);

  xmlhttp.onload = function() {
    if (xmlhttp.status === 200) {
      resolve(JSON.parse(xmlhttp.responseText));
    } else {
      resolve(defaultEnvironment);
    }
  };

  xmlhttp.send();
});
