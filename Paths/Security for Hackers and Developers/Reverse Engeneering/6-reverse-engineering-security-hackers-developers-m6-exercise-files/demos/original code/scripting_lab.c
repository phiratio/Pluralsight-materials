#include <stdio.h>

char * secret_data = "\x0c\x38\x61\x2f\x20\x2c\x24\x61\x28\x32\x61\x0b\x20\x33\x24\x25\x61\x05\x24\x0c\x2e\x35\x35\x6f\x61\x61\x15\x24\x20\x22\x29\x28\x2f\x26\x61\x00\x31\x31\x12\x24\x22\x61\x28\x32\x61\x27\x34\x2f\x60\x41";

int copy(char * dst, char * src)
{
	strcpy(dst, src);
}

int decode(char * pass, char * clr)
{
	int i =0;
	int quit=0;
	for(; ; i++)
	{
		if(secret_data[i]==0)
		{
			quit++;
			if (quit == 2)
				break;
		}
		clr[i]=secret_data[i] ^ *pass;
	}
}

int output(char * clr)
{
	char tmp[100];

	sprintf(tmp, clr);

	printf("Decrypted buffer: %s\n", tmp);
}

int main(int argc, char * argv[], char * envp[])
{

	char pass[100];
	char clear[100];

	if(argc != 2)
	{
		printf("Please enter password\n");
		exit(-1);
	}

	copy(pass, argv[1]);

	decode(pass, clear);

	output(clear);

}