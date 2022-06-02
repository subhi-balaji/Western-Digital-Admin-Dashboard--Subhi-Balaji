Necessary tools needed to start this react app:
	Install MongoDB and compass
	Install node js



Install node_modules in server folder and client folder if it don't exist already:
   - Terminal window 1:
        cd server
	    npm install     

   - Terminal window 2:
        cd client
        npm install    



Run the app:
   - Start your database (brew services start mongodb-community@5.0)
   
   - Terminal window 1:
        cd server
        npx nodemon 
          
   - Open the MongoDB compass app and paste "mongodb://127.0.0.1:27017/dashboard" into the paste your connection string and click connect

   - Insert csv fils in MongoDB 
        In the MongoDB Compass, open the database named "dashboard"
        insert the seachinfos.csv file into the serachinfos collection 
        insert the systeminfos.csv file into the systeminfos collection 

   - Terminal window 2:
        cd client
        npm start       






Important commands for MongoDB on Mac:
	brew services start mongodb-community@5.0
	brew services stop mongodb-community@5.0
	brew services list



