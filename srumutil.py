import json
import os
import subprocess
import time
import ctypes, sys
import pandas as pd
import re
def is_admin():
    try:
        return ctypes.windll.shell32.IsUserAnAdmin()
    except:
        return False

def StartMeasuring():
  if is_admin():
    stopvalue = subprocess.run('sc stop dps',shell=True, cwd='C:\\Windows\\System32\\sru')
    print(stopvalue)
    # 
    if stopvalue.returncode == 0:
      print("please wait for few seconds..")
      t_end = time.time() + 60 * 0.1
      while time.time() < t_end:
        ""
      isMoved = subprocess.run('move SRUDB.dat srudb.dat.bak',shell=True, cwd='C:\\Windows\\System32\\sru' )
      print(isMoved)

      print("Starting dps Service")
      isStarted = subprocess.run('sc start dps',shell=True, cwd='C:\\Windows\\System32\\sru')
      print(isStarted)

      if isStarted.returncode != 0:
        return {"status": isStarted.returncode,"message":"Already a instance is running"}
      
      return {"status":stopvalue.returncode,"message":"Measuring Started"}
    # 
    else :
      return {"status": stopvalue.returncode,"message":"Unable To Stop Service"}
  else:
    return {"status":401,"message":"Requires Administrative Access"}

def StopMeasuring():
  print("exporting csv file")
  reportOutput = subprocess.run('powercfg /srumutil',shell=True, cwd='C:\\Users')
  print(reportOutput)
  if reportOutput.returncode == 0:
    return {"status":reportOutput.returncode,"message" : "Successfully Generated Report"}
  else:
    return {"status":reportOutput.returncode,"message" : "Some Error Occured"}

def readCSV(AppId,name):
  print(AppId,name)
  df = pd.read_csv('C:\\Users\\srumutil.csv')
  app = df[df['AppId'].str.contains(re.escape(AppId) ,case=False) | df['AppId'].str.contains(re.escape(name) ,case=False)]
  totalEngCon = app[' TotalEnergyConsumption'].cumsum().iloc[-1]
  CPUEngCon = app[' CPUEnergyConsumption'].cumsum().iloc[-1]
  SocEngCon = app[' SocEnergyConsumption'].cumsum().iloc[-1]
  DisplayEngCon = app[' DisplayEnergyConsumption'].cumsum().iloc[-1]
  DiskEngCon = app[' DiskEnergyConsumption'].cumsum().iloc[-1]
  NetworkEngCon = app[' NetworkEnergyConsumption'].cumsum().iloc[-1]
  OtherEngCon = app[' OtherEnergyConsumption'].cumsum().iloc[-1]
  EmiEngCon = app[' EmiEnergyConsumption'].cumsum().iloc[-1]
  CPUEngConWorkOnBehalf = app[' CPUEnergyConsumptionWorkOnBehalf'].cumsum().iloc[-1]
  CPUEngConAttributed = app[' CPUEnergyConsumptionAttributed'].cumsum().iloc[-1]
  # print("json" , json.dumps(result))
  print(app)
  return {
    "TotalEnergyConsumption" : int(totalEngCon),
    "CPUEnergyConsumption" : int(CPUEngCon),
    "SocEnergyConsumption" : int(SocEngCon),
    "DisplayEnergyConsumption" : int(DisplayEngCon),
    "DiskEnergyConsumption" : int(DiskEngCon),
    "NetworkEnergyConsumption" : int(NetworkEngCon),
    "OtherEnergyConsumption" : int(OtherEngCon),
    "EmiEnergyConsumption" : int(EmiEngCon),
    "CPUEnergyConsumptionWorkOnBehalf" : int(CPUEngConWorkOnBehalf),
    "CPUEnergyConsumptionAttributed" : int(CPUEngConAttributed),
    }

if __name__ == "__main__":
 readCSV('Windows\System32\conhost.exe','whatsapp')