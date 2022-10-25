import os
import subprocess
import time
import ctypes, sys
import pandas as pd

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
  reportOutput = subprocess.run('powercfg /srumutil',shell=True, cwd='C:\\Windows\\System32')
  print(reportOutput)
  if reportOutput.returncode == 0:
    return {"status":reportOutput.returncode,"message" : "Successfully Generated Report"}
  else:
    return {"status":reportOutput.returncode,"message" : "Some Error Occured"}

def readCSV():
  df = pd.read_csv("C:\\Windows\\System32\\srumutil.csv")
  app = df[df['AppId'].str.contains('EMi_RAPL_Package0_PKG',case=False)]
  print(app.columns)
  print(app.cumsum())
  print(app[' TotalEnergyConsumption'].cumsum())
if __name__ == "__main__":
  readCSV()