import cpuinfo
import sys

def isSystemCompatible():
    srumutil = True
    ipg = True
    if sys.platform.startswith("linux"):  
        srumutil = False
    elif sys.platform == "darwin":
        print('mac')
    elif sys.platform == "win32":
        print('windows')

    # print(srumutil,ipg)
    return {"srumutil": srumutil,"ipg" : ipg}