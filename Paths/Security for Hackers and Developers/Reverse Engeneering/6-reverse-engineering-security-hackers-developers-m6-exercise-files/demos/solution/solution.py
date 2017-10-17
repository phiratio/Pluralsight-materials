key = 0x41
encoded = 0x0040B000
decoded = ""
c = 0

index = 0
while 1:
	c = Byte(encoded+index) ^ key
	if( c == 0x00 ):
		break
	#print "%c" % c,
	decoded += str(chr(c))
	index += 1

print decoded