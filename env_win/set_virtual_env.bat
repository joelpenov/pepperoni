virtualenv crunchyenv -p c:\python34\python.exe &
pip install libs\mysqlclient-1.3.7-cp34-none-win32.whl &
pip install -r requirements.txt &
python -m pip install --upgrade pip & crunchyenv\scripts\activate &