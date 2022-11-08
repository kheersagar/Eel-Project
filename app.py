
import psutil
import eel
from srumutil import StartMeasuring, StopMeasuring, readCSV
from test import *
from systemCompatible import *

eel.init('web')

def get_username():
    return psutil.Process().username()
@eel.expose
def checkSystem():
  return isSystemCompatible()

@eel.expose
def getProcess():
  username = get_username()
  listOfProcObjects ={}
    # Iterate over the list
  for proc in psutil.process_iter():
    try:
        # Fetch process details as dict
        pinfo = proc.as_dict(attrs=['pid', 'name', 'username','ppid','status','exe'])
        if(type(pinfo['username']) is str and pinfo['exe'] is not None and pinfo['exe'] != '' and pinfo['username'] == username and pinfo['status'] == psutil.STATUS_RUNNING ) :           
          if(pinfo['ppid'] in listOfProcObjects.keys()):
            listOfProcObjects[pinfo['ppid']].append(pinfo)
          else:
            listOfProcObjects[pinfo['ppid']] = [pinfo]
    except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
        pass
  result = [listOfProcObjects]
  return result

@eel.expose
def startDPSService():
  return StartMeasuring()

@eel.expose
def stopDPSService():
  return StopMeasuring()

@eel.expose
def applicationConsumption(AppId,name):
  return readCSV(AppId,name)
  
eel.start('index.html')