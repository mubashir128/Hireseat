# !/bin/bash
echo "----------*************************************************************------------"

# any future command that fails will exit the script
 set -e

# Delete the old repo
# sudo rm -rf /var/www/html/codeVianBackend/
# navigate to the folder
cd /var/www/html/gitlab/HireSeat_Web
echo "----------------check git status--------------------"
sudo git status
echo "----------------end git status--------------------"
echo "--------------------------------------------------"
echo "--------------------------------------------------"
echo "--------------------------------------------------"

# clone the repo again
# sudo git clone https://gitlab.com/pritamnb/codeVianBackend.git
sudo git pull
echo "--------------------------------------------------"
echo "--------------------------------------------------"
echo "--------------------------------------------------"
echo "--------------------------------------------------"
sudo chmod 755 /var/www/html/gitlab/HireSeat_Web/dist/
#source the nvm file. In an non
#If you are not using nvm, add the actual path like
# PATH=/home/ubuntu/node/bin:$PATH
# source /home/ubuntu/.nvm/nvm.sh

# stop the previous pm2
# sudo pm2 kill
# sudo npm remove pm2 -g
# getting inside of cloned repo
# cd codeVianBackend/
#pm2 needs to be installed globally as we would be deleting the repo folder.
# this needs to be done only once as a setup script.
# sudo npm install pm2 -g
# starting pm2 daemon
# sudo pm2 status

# cd codeVianBackend/
#install npm packages
echo "Running npm install"
# ls
# sudo npm install
# export user_jwtPrivateKey=jwtPrivateKey
#Restart the node server
#npm start
# sudo pm2 start index.js
# forever stop server.js
# forever start server.js
# sudo pm2 kill
# sudo pm2 start server.js