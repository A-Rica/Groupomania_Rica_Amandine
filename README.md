# Groupomania: Projet 7 Openclassroom.

7ième et dernier projet d’OpenClassroom. Groupomania est un réseau social d’entreprise, dans le même genre que Reddit. Les outils utilisés pour le site :
Frontend : Vuejs et VueX ;
Backend : NodeJs, Sequelize et Express ;
Base de Données : MySql.

## Backend

Afin de pouvoir user de la partie Backend. Ouvrez le dossier correspondant après avoir cloné le github. 

```
cd backend
```

Une fois le fichier ouvert dans votre logiciel, veuillez lancer la commande suivante :

```
npm install
```

et ensuite :

```
nodemon server 
```

ou

```
npm start
```

## Frontend

Comment pour le backend, veuillez vous rendre dans le dossier frontend.

```
cd frontend.
```

Puis, entrer la commande suivante : 

```
npm install
```

ensuite :  

```
npm run server
```

Si la page ne s’ouvre pas dans votre navigateur. Voici le lien correspondant.

[http://localhost:8080/](http://localhost:8080/)

## Base de donnée

Veuillez activé Mysql dans votre terminal avec : 

```
mysql -u root -p
```

ou encore, via le command line client. Après avoir entré votre mot de passe, veuillez entrer la commande suivante : 

```
CREATE DATABASE nomdeladatabase ; (groupomania)
```

Puis:

```
USE nomdeladatabase ; (groupomania) 
```

Pour tout ce qui est des données de configuration, veuillez suivre l’exemple dans le fichier « .env.exemple » et crée un fichier .env avec les données correspondant.
