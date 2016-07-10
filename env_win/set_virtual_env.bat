virtualenv crunchyenv -p c:\python34\python.exe &  crunchyenv\scripts\activate &
pip install libs\mysqlclient-1.3.4-cp34-none-win_amd64.whl &
pip install -r requirements.txt &
python -m pip install --upgrade pip