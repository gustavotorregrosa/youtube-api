Overview

This small system works as an interface for YouTube searches. It is composed by:
    API written in Lumen
    SPA written in React
    Docker session


Instalation

    Backend
    01. Clone the project from github to a folder named “youtube-api”.
    02. Rename the “.env.sample” file to “.env” and paste your own Google API credentials to “youtube-api/backend-lumen/storage/my-credentials.json”
    03. in you hosts file (“/etc/hosts”, in Linux), copy the line:	
    127.0.0.1	youtube-api.localhost
    04. In the “youtube-api/backend-lumen/” folder, run “composer update” and give writting permissions to the “storage” folder
    05.In the “youtube-api/docker/” folder, run “docker-compose up -d”
    
    Frontend
    06. In the “youtube-api/frontend-react/” folder, run “npm install” and then “npm start -o”.
    07. Enjoy ;)

Overview
	Google integration via oAuth2
	Use of Lumen service container to inject the desired services
	The major work is done by the services, allowing the controller to be real clean
