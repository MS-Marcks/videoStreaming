# **StreamOnLive_SOL**
# **INDICE**
- [INTRODUCCIÓN](#id1)
- [ENFOQUE DEL SISTEMA](#id2)
- [SERVICIO DE STREAMING (SOL)](#id3)
- [DIAGRAMA PRINCIPAL DEL SERVIDOR](#id4)
- [CONFIGURACIÓN DEL SERVIDOR PRINCIPAL](#id5)
  - [INSTALACIÓN DEL DOCKER](#id5.1)
- [STREAM ON LIVE (SOL FRONTEND)](#id7)
  - [DEFINICION DE LA APLICACION](#id7.1)
  - [CONFIGURACIÓN DEL NGINX EN ANGULAR](#id7.2)
  - [CONFIGURACIÓN PARA LA CREACIÓN DE LA IMAGEN DEL FRONTEND EN DOCKER](#id7.3)
  - [COMPONENTE PARA LA TRASMISIÓN EN VIVO](#id7.4)
  - [COMANDO NECESARIO PARA CREAR LA IMAGEN Y PARA INICIAR LA IMAGEN](#id7.5)
    - [COMANDO PARA CREAR LA IMAGEN](#id7.6)
    - [COMANDO PARA INICIAR LA IMAGEN](#id7.7)
  - [GITHUB ACTIONS DEL SERVIDOR DEL FRONTEND](#id7.9)
- [STREAM ON LIVE (SOL BACKEND)](#id8)
  - [DEFINICIÓN DE LOS QUE HACE LA APLICACIÓN](#id8.1)
  - [CONFIGURACIÓN PARA LA CREACIÓN DE LA IMAGEN DEL BACKEND EN DOCKER](#id8.2)
  - [COMANDO NECESARIO PARA CREAR LA IMAGEN Y PARA LEVANTAR LA IMAGEN](#id8.3)
    - [COMANDO PARA CREAR LA IMAGEN](#id8.4)
    - [COMANDO PARA INICIAR LA IMAGEN](#id8.5)
  - [GITHUB ACTIONS DEL SERVIDOR DEL BACKEND](#id8.7)
- [CONCLUSIONES](#id10)
- [RECOMENDACIONES](#id11)

# **INTRODUCCIÓN** <a name="id1"></a>

# **ENFOQUE DEL SISTEMA** <a name="id2"></a>


# **CONFIGURACION DEL SERVIDOR PRINCIPAL** <a name="id5"></a>
Para el ejemplo de un servidor de streaming se usara el proveedor en la nube DigitalOcean, en cual se usara uno de sus servicios llamada Droplets, en cual podra acceder a digitalOcean con el siguiente enlace: [DigitalOcean](https://www.digitalocean.com/)

  - ## **INSTALACION DE DOCKER** <a name="id5.1"></a>
      En el caso para facilitar el despliegue de las aplicaciones se usara Docker en cual podrá acceder al siguiente enlace para la instalación(Ubuntu): [Docker](https://www.digitalocean.com/community/tutorials/como-instalar-y-usar-docker-en-ubuntu-18-04-1-es)

# **STREAM ON LIVE (SOL FRONTEND)**<a name="id7"></a>
Para la parte de la visualizacion se creó una aplicación en angular para llevar todo el manejo y visualización de los videos en transmision por demanda que se este viendo actualmente, así como las conexiones necesarias para que todo funcione y que el usuario pueda interactuar con todas las funcionalidades que ofrece el sistema.

  ## **DEFINICION DE LA APLICACION**<a name="id7.1"></a>
  
   La aplicacion muestra una pagina principal donde se encuentran todos los videos disponibles para visualizarlos y verlos en tiempo real y por demanda, también se encuentra una opción para poder subir videos, donde se registrará el nombre, una portada y el propio video. para que los demas usuarios puedan verlos y asi tambien un apartado para poder visualizar dichos videos

  ![sol](img/001.png)

  ![sol](img/002.png)

  ![sol](img/003.png)

  ![sol](img/004.png)
  
  ## **CONFIGURACION DEL NGINX EN ANGULAR**<a name="id7.2"></a>

  Después de que se cree la aplicación base lo siguiente que se debe de realizar es la conexión del servidor NGINX a la aplicación.
  Se crea en la ruta principal del proyecto una carpeta con el nombre nginx y dentro de ella crear un documento nginx.conf donde colocaremos toda la configuración del servidor.

  

  El contenido de nginx.conf es el siguiente.
  ```nginx
  server {
    # Se establece el puerto del servidor, que será el puerto 80. Luego se tablece la ruta de la aplicación. ambién con la  instrucción try_files se redirecciona a una ruta en caso de que la principal no sea encontrada y de esta manera evitar que resulte en una solicitud con 404.
    listen 80; 
    location / {
      root   /usr/share/nginx/html;
      index  index.html index.htm;
      try_files $uri $uri/ /index.html;
    }

    # Luego se colocan los encabezados de seguridad para poder establecer los parámetros que son válidos y los que no. Cada uno de los encabezados que se van a configurar le dice al navegador que puede aplicar ciertas restricciones de seguridad a la página, con el fin de mitigar amenazas particulares.
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options  nosniff always;

    # Por último, se establecen el rango de errores que puede poseer la aplicación y la ruta que se usará cuando ocurra algún error.
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
      root   /usr/share/nginx/html;
    }
  }
  ```  
  ## **CONFIGURACION PARA LA CREACION DE LA IMAGEN EN DOCKER**<a name="id7.3"></a>
  Se creará en la raíz del proyecto de angular un archivo llamado *Dockerfile* que contendrá la configuración para indicarle a Docker cuales son las instrucciones necesarias para crear la imagen.


  El contenido del Dockerfile es el siguiente.
  ```Dockerfile
  FROM nginx:1.18.0-alpine # Primero se coloca la imagen que se utilizará, que es una imagen de NGINX.
  COPY dist/live /usr/share/nginx/html #   Luego se colocará el comando para copiar el código de la aplicación en la carpeta del servidor.
  RUN rm /etc/nginx/conf.d/default.conf #   Posteriormente se colocará el comando que eliminará el documento de configuración por defecto de NGINX.
  COPY nginx/nginx.conf /etc/nginx/conf.d # Luego se copiará la configuración realizada anteriormente en la ruta establecida.
  EXPOSE 443 # Se establecerá el puerto de la aplicación.
  CMD ["nginx","-g","daemon off;"] # Por último, se colocará el comando que inicia el servicio de NGINX y se indicará que el proceso en segundo plano estará desactivado.
  ```

  ## **COMANDO NECESARIO PARA CREAR LA IMAGEN Y PARA INICIAR LA IMAGEN**<a name="id7.5"></a>
  - ### **COMANDO PARA CREAR LA IMAGEN** <a name="id7.6"></a>
  ```
  $ docker build -t “cloud.canister.io:5000/msmarcks/sol:latest” .
  ```
  - ### **COMANDO PARA INICIAR LA IMAGEN** <a name="id7.7"></a>
  ```
  $ docker run --name “sol” -p “80:80” -d cloud.canister.io:5000/msmarcks/sol:latest
  ```

# **GITHUB ACTIONS DEL SERVIDOR DE FRONTEND**<a name="id7.9"></a>

Aquí debe asignarle nombre al GitHub Actions, que en este caso es de front-server-live.yaml
```yaml
name: front server live
on: # En esta parte, está el encabezado de la información sobre el GitHub Actions.
push: # Y cuando exista un cambio en el main es donde se ejecutará el GitHub Actions en este caso en la rama main, es decir cuando se apruebe un pull request.
    branches: [main]
    paths:  # Aquí debe indicar en que carpeta-proyecto se tomara para realizar el GitHub Actions para el encapsulamiento del código.
      - "live/**"
jobs: # En esta parte se debe hacer el encapsulamiento de la subida de toda la información al servidor.
  integrate:
  runs-on: ubuntu-latest # Aquí es cuando la imagen esta sobre un Ubuntu y este se encarga de agarrar la última versión de Ubuntu.
  steps: 
    - uses: actions/checkout@v2 # Toma la versión más reciente de los GitHub Actions.
    - uses: actions/setup-node@v2 # Toma la última versión del Nodejs.
    - run: docker login -u ${{secrets.USERNAME_CANISTER}} -p ${{secrets.PASSWORD_CANISTER}} cloud.canister.io:5000 # Aquí se deben colocar las credenciales de la imagen del Docker tomando las variables secretas del GitHub y esto se puede considerar que son como las variables de entorno.
    - run: cd live && npm install && npm run package && docker build -t "cloud.canister.io:5000/msmarcks/sol:latest" . # Hace el empaquetamiento de la aplicación.
    - run: docker push cloud.canister.io:5000/msmarcks/sol:latest # Y en esta parte se encarga de subir todo lo que fue empaquetado a la dirección del server.
    - name: andrewtwydell/ssh
      uses: AndrewTwydell/ssh-workflow@1.0.0
      # se realizo la conexion al servidor mediante el host, username y el password mediante los secretos de github
      with:
        # SSH Host
        host: ${{ secrets.SSH_HOST }} 
        # User name
        user: ${{ secrets.SSH_USERNAME }}
        # User Password
        password: ${{ secrets.PASSWORD_SSH }}
        # en cual primero inicia sesion en el repositorio privado de imagenes de docker, posteriormente verifica si un contenedor de la imagen esta activa para posteriormente eliminarla y colocar la nueva imagen en linea para su actualizacion
        script: | 
        docker login -u ${{secrets.USERNAME_REPO}} -p ${{secrets.PASSWORD_REPO}} cloud.canister.io:5000
        docker ps -a -q --filter "name=frontapplive" | grep -q . && docker stop frontapplive && docker rm -fv frontapplive && docker image rm cloud.canister.io:5000/msmarcks/sol:latest || echo ""
        docker run --name frontapplive -p "80:80" -d cloud.canister.io:5000/msmarcks/sol:latest
        exit      
```

# **STREAM ON LIVE (SOL BACKEND)**<a name="id8"></a>

  ## **DEFINICION DE LA APLICACION** <a name="id8.1"></a>
  El orquestador sera el encargado de darle la logica funcional al sistema y de la misma manera realizara la comunicación con el servidor.

  ## **CONFIGURACION PARA LA CREACION DE LA IMAGEN DEL BACKEND EN DOCKER** <a name="id8.2"></a>
  Se creara el archivo Docker en la raiz del proyecto de backend el cual tendra el nombre de *Dockerfile* dicho archivo contendra la configuración para darle las instrucciones a Docker de cuales seran las instrucciones necesarias para crear la imagen.
  
  El contenido del Dockerfile es el siguiente.
  ```Dockerfile
 FROM node:14.17-alpine # Primero se coloca la imagen que se utilizará, que es una imagen de NODEJS.
WORKDIR /app #   Despues se usara el comando para establecer el directorio de trabajo para las instrucciones siguientes
COPY . /app/ #  Luego se colocará el comando para copiar el código de la aplicación en la carpeta del servidor.
RUN npm install # posteriormente se colocará el comando que instalara los paquetes de nodeJS 
RUN npm start # Se colocara el comando para iniciar el servidor
COPY . /app/ # Luego se copiará la configuración realizada anteriormente en la ruta establecida.
EXPOSE 3000 # Se establecerá el puerto de la aplicación.
CMD ["node","build/server.js"] #   Por último, se colocará el comando que inicia el servicio del servidor del orquestador y se dara la instruccion de que el proceso en segundo plano estará desactivado.
  ```

  ## **COMANDOS NECESARIOS PARA CREAR LA IMAGEN E INICIAR LA IMAGEN**<a name="id8.3"></a>
  - ### **COMANDO PARA CREAR LA IMAGEN** <a name="id8.4"></a>
  ```
  $ docker build -t “cloud.canister.io:5000/msmarcks/back:latest” .
  ```
  - ### **CCOMANDO PARA INICIAR LA IMAGEN** <a name="id8.5"></a>
  ```
  $ docker run --name “backend” -p “3000:3000” -d cloud.canister.io:5000/msmarcks/back:latest
  ```
# **GITHUB ACTIONS DEL BACKEND** <a name="id8.7"></a>
Aquí debe asignarle nombre al GitHub Actions, que en este caso es de back-server-live.yaml
```yaml
name: back server live
on: # En esta parte, está el encabezado de la información sobre el GitHub Actions
 push: # Y cuando exista un cambio en el main es donde se ejecutará el GitHub Actions en este caso en la rama main, es decir cuando se apruebe un pull request.
    branches: [main]
    paths: # Aquí indica en que carpeta-proyecto se tomara para realizar el GitHub Actions para el encapsulamiento del código.
      - "orquestador/**"
jobs: # En esta parte se hace el encapsulamiento de la subida de toda la información al servidor.
  integrate: 
    runs-on: ubuntu-latest # Aquí es cuando la imagen esta sobre un Ubuntu y este se encarga de agarrar la última versión de Ubuntu.
    steps:
      - uses: actions/checkout@v2  # Toma la versión más reciente de los GitHub Actions.
      - uses: actions/setup-node@v2  # Toma la última versión del Nodejs.
      - run: docker login -u ${{secrets.USERNAME_CANISTER}} -p ${{secrets.PASSWORD_CANISTER}} cloud.canister.io:5000  # Aquí se deben colocar las credenciales de la imagen del Docker tomando las variables secretas del GitHub y esto se puede considerar que son como las variables de entorno.
      - run: cd orquestador && docker build -t "cloud.canister.io:5000/msmarcks/back:latest" . # Hace el empaquetamiento de la aplicación.
      - run: docker push cloud.canister.io:5000/msmarcks/back:latest # Y en esta parte se encarga de subir todo lo que fue empaquetado a la dirección del server.
      - name: andrewtwydell/ssh
        uses: AndrewTwydell/ssh-workflow@1.0.0
         # se realizo la conexion al servidor mediante el host, username y el password mediante los secretos de github
        with:
          # SSH Host
          host: ${{ secrets.SSH_HOST }}
          # User name
          user: ${{ secrets.SSH_USERNAME }}
          # User Password
          password: ${{ secrets.PASSWORD_SSH }}
           # en cual primero inicia sesion en el repositorio privado de imagenes de docker, posteriormente verifica si un contenedor de la imagen esta activa para posteriormente eliminarla y colocar la nueva imagen en linea para su actualizacion
          script: | 
            docker login -u ${{secrets.USERNAME_REPO}} -p ${{secrets.PASSWORD_REPO}} cloud.canister.io:5000
            docker ps -a -q --filter "name=backapplive" | grep -q . && docker stop backapplive && docker rm -fv backapplive && docker image rm cloud.canister.io:5000/msmarcks/back:latest || echo ""
            docker run --name backapplive -p "3333:3000" -e "KEY_TOKEN=DKCngTbQ0IzUMvqEto4ucxPHkPMrhXPsIkj6hsXDCjNb64zI9JyScaeW6fJ7SH8TResT5DUdnFsYbcRkzC35wRsYDuqe0yxaFNSVohPp1sHPP6seS88VB7y1gPMTsTZP" -e "TIME_PARTITION_CHUNK=102400" -d cloud.canister.io:5000/msmarcks/back:latest
            exit
```
# **CONCLUSIONES** <a name="id10"></a>
# **RECOMENDACIONES** <a name="id11"></a>