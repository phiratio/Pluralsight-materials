#include <stdio.h>

int main()
{
    char password[7];
	int i = 1;
	while (i == 1)
	{
	printf("Please Enter a password ");
    fgets(password, 7, stdin);
        
	password[0] = (password[0] + 121) / 2;				// ends up = 'v' 118
	password[1] = (((password[1] + password[0]) * 2) / 3) - 30;  //  //ends up = 't' 116
	password[2] = 101;      //ends up = 'e' 101
	password[3] = (((password[3] + password[1]) + 1) / 2);    // ends up = 's' 115
	password[4] = (((password[4] + password[3] + password[0]) + 2) / 3);  //ends up = 'p' 112
	password[5] = (((password[5] + password[4]) / 2));      // ends up = 'r' 114

	if (password[0] == 118 && password[1] == 116 && password[2] == 101 && password[3] == 115 && password[4] == 112 && password[5] == 114)
	{
		printf("good job");
		i = 0;
	}
	else 
	{
		printf("Not quite\n");
		printf("After conversion your input looks like ");
		printf("%c%c%c%c%c%c", password[0],password[1],password[2],password[3],password[4],password[5]);
		printf("\nTry again\n");
	}
	}
	return 0;
}