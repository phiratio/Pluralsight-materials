#include <stdio.h>
int main()
{
	if (1U > -1)
		printf("yes to 1\n");

	if( (unsigned short)1 > -1 )
		printf("yes to 2\n");

}
