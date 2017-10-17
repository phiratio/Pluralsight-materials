key = 0x41 #Do you know how this was discovered?
#Think about what happens when you xor a byte with zero...
#and which byte in a string is likely to be zero?
encoded = 0x0040B000
decoded = ""
c = 0

index = 0
while 1:

	#decoded += str(chr(c))
	#index += 1

print decoded