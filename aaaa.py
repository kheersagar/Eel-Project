import subprocess
import time

def afd():
  out = subprocess.run('sc stop dps', shell=True,cwd='C:\\Windows\\System32\\sru')
  print(out)
  t_end = time.time() + 60 * 0.1
  while time.time() < t_end:
    ""
  out = subprocess.run('move SRUDB.dat srudbaaa.dat.bak', shell=True,cwd='C:\\Windows\\System32\\sru')
  print(out)

  out = subprocess.run('sc start dps', shell=True,cwd='C:\\Windows\\System32\\sru')
  print(out)
  return out
if __name__ == '__main__':
  print (afd())