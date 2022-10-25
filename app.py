
import psutil
import eel
from srumutil import StartMeasuring, StopMeasuring
from test import *
eel.init('web')

@eel.expose
def getProcess():
  listOfProcObjects ={}
    # Iterate over the list
  for proc in psutil.process_iter():
    try:
        # Fetch process details as dict
        pinfo = proc.as_dict(attrs=['pid', 'name', 'username','ppid','status','exe'])
          
        if(type(pinfo['username']) is str and pinfo['username'] != 'None' and pinfo['status'] == psutil.STATUS_RUNNING ) : 
          
          if(pinfo['ppid'] in listOfProcObjects.keys()):
            listOfProcObjects[pinfo['ppid']].append(pinfo)
          else:
            listOfProcObjects[pinfo['ppid']] = [pinfo]
    except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
        pass
  # sorted_list = sorted(listOfProcObjects.items(), key=lambda x : x[1][0]['name']  , reverse=True)
  # result = [dict(sorted_list)]
  result = [listOfProcObjects]
  return result

@eel.expose
def startDPSService():
  return StartMeasuring()

@eel.expose
def stopDPSService():
  return StopMeasuring()
eel.start('index.html')