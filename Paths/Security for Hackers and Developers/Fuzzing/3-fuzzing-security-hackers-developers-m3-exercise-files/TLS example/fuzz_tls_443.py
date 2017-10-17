#!c:\\python\\python.exe

#
# Jared DeMott <jdemott@vdalabs.com>
#
# Testing the sulley fuzzing framework against tls/ssl/https

#import sys
#sys.path.append('C:\Program Files\Sulley Fuzzing Framework')
from sulley import *
from requests import tls

########################################################################################################################
sess = sessions.session(session_filename="audits/tls/tls.session", sleep_time=.25, log_level=10)
sess.add_target(sessions.target("192.168.0.104", 443))
sess.connect(s_get("client_hello"))
sess.fuzz()
