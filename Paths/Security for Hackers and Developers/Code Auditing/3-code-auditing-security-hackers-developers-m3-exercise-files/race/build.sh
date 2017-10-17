#g++ -o race race.cpp -g
g++ -o race race_fixed.cpp -g
sudo chgrp root race
sudo chown root race
sudo chmod +s race
ls
cat /etc/shadow
echo "./race /etc/shadow"
./race /etc/shadow
rm /tmp/attack
echo "ln -s /etc/shadow /tmp/attack"
ln -s /etc/shadow /tmp/attack
echo "./race /tmp/attack"
./race /tmp/attack
