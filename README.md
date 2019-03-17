# nodeChatTest
Simple Chat using Node.js and Mysql

# Required Software

[Mysql 8.0](https://dev.mysql.com/doc/refman/5.6/en/osx-installation-pkg.html)

[NodeJS](https://nodejs.org/en/)

#Installation

## Install Mysql

Install Mysql 8.0 (following the instructions above)

Be careful and choose the 5.6 version of password encryption as the 8.0 version
is troublesome sometimes

Create your root user for the database and pick any password you like.

Once you finish...

## Clone this project locally

You can clone with the git command:

```git clone https://github.com/joselcastillop/nodeChatTest.git && cd nodeChatTest```

This will clone the project for you and locate you inside the nodeChatTest project folder

## Install dependencies

Start by installing the dependencies for the Node.js project to run.

Execute 

```npm install dependencies```

You should already have MySQL installed and know your root username and password.

Set your DB info on the file

```~/nodeChatTest/config/db_config.js```

After Setting the info on the file, check your DB connection by running:

```cd ~/nodeChatTest/database_setup && node check_db_connection.js```

Create the database by running

```cd ~/nodeChatTest/database_setup && node create_db.js```

Create the tables by running

```cd ~/nodeChatTest/database_setup && node create_tables.js```

Start the server by running

```cd ~/nodeChatTest/ && node run start```

After the program runs, access http://localhost:3000 and you can start chatting!

