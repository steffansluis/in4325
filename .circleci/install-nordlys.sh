if [ ! -d nordlys ]; then
  git clone https://github.com/iai-group/nordlys.git
fi
cd nordlys
pip install -r requirements.txt