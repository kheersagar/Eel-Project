import os
import subprocess
import time
import ctypes, sys

def is_admin():
    try:
        return ctypes.windll.shell32.IsUserAnAdmin()
    except:
        return False

def executeCmd():
  if is_admin():
    stopvalue = subprocess.run('sc stop dps',shell=True, cwd='C:\\Windows\\System32\\sru')
    print(stopvalue)
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

      print("please wait for a minute..")
      t_end = time.time() + 60 * 1
      while time.time() < t_end:
        ""

      print("1 minute completed")
      print("exporting csv file")
      reportOutput = subprocess.run('powercfg /srumutil',shell=True, cwd='C:\\Windows\\System32')
      print(reportOutput)
      return {"status":reportOutput.returncode,"message" : "Successfully Generated Report"}
    else :
      print('Some error occured')
      t_end = time.time() + 60 * 0.2
      while time.time() < t_end:
        ""
      return {"status": stopvalue.returncode,"message":"Unable To Stop Service" }
  
  else:
    print("inside else block")
    ctypes.windll.shell32.ShellExecuteW(None, "runas", sys.executable, " ".join(sys.argv), None, 1)

if __name__ == '__main__':
  print(executeCmd())





