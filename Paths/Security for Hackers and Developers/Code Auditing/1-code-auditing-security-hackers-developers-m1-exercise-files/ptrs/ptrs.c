#include <stdio.h>

int main()
{
	int a, b, c;
	int array[4] = {0, 1, 2, -1};
	int *ptr = array;
	a = *ptr;		//0
	b = *ptr++;		//0
	c = *ptr+=2;	//3
	printf("a=%d, b=%d, c=%d\n", a, b, c);

	ptr = array;
	a = *ptr;		//0
	b = *(ptr + 1);	//3, why isn't this 1?
	c = *(ptr + 2);	//2
	printf("a=%d, b=%d, c=%d\n", a, b, c);

	array[1] = 1;
	ptr = array;
	a = *ptr++;		//0
	b = *ptr++;		//1
	c = *ptr++;		//2
	printf("a=%d, b=%d, c=%d\n", a, b, c);

}
