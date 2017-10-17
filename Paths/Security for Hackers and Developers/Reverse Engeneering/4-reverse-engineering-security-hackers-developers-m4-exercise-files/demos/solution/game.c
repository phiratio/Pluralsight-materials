#include<stdio.h>

char solution[] = {1, 2, 3, 4, 5, 6, 7};

int mix()
{
	solution[4] = solution[1] * 100; //3th=200 or 0xc8
	solution[1] = solution[4] / 25; //2nd=8 
	solution[6] = solution[2] + solution[4] + 3; //7th=206 or 0xCE
	solution[0] = 88; //1st=88 or 0x58
	solution[5] = (88 + 99 + 1 + 56 -4 - 6 - 2 - 1)*2  + solution[1]; //470 or 0xd6
	solution[3] = solution[2] + solution[4]/2; //103 or 0x67
	solution[2] = solution[3]/solution[5] + 6; //2nd=6
	//"\x58\x08\x06\x67\xc8\xd6\xce" ?? doesn't matter the point is it's hard to RE, but patching is easy! :)
}

int checker(char * key)
{
	mix();
	if(key[0]==solution[0])
		if(key[1]==solution[1])
			if(key[2]==solution[2])
				if(key[3]==solution[3])
					if(key[4]==solution[4])
						if(key[5]==solution[5])
							if(key[6]==solution[6])
								return 1;
	return 0;
}

int play()
{
	printf("Congratulations you passed the lab!");
}

int main(int argc, char ** argv, char ** env)
{
	int code=0;
	if (argc != 2)
	{
		printf("Usage: game license_key\r\n");
		exit(-1);
	}

	code = checker(argv[1]);

	if(code)
		play();
	else
	{
		printf("Bad license key, go online and buy one, you cheap son of a gun!\r\n");
		exit(-1);
	}
}